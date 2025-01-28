import cloudinary from "../lib/cloudnary.js";
import {redis} from "../lib/redis.js";
import ProductData from "../model/product.model.js";

const  UpdataFeaturProductCache= async ()=>{

     try {
           
          const featurdProduct=await ProductData.find({isFeatured:true}).lean();

          await redis.set("featured_product",JSON.stringify(featurdProduct));
     } catch (error) {
          console.log("the error created on the UpdataFeaturProductCache", error.message);
         
     }

}

export const GetAllProduct = async (req, res) => {
     try {
       const products = await ProductData.find({}); // Await the database call
       res.json({ products }); // Send the actual products
     } catch (error) {
       console.log("The error created on the admin:", error.message);
       res.status(500).json({ error: "Server error on the ProductData" });
     }
   };

export const getFeaturProduct = async (req, res) => {
  try {
    let featurdProduct = await redis.get("featured_product");
    if (featurdProduct) {
      return res.status(200).json(JSON.parse(featurdProduct));
    }
    featurdProduct = await ProductData.find({ isFeatuerd: true }).lean();

    if (!featurdProduct) {
      return res
        .status(404)
        .json({ error: "the feature product is not found" });
    }

    await redis.set("featured_product", JSON.stringfy(featurdProduct));
    res.json(featurdProduct);
  } catch (error) {
    console.log("the error created on the admin", error.message);
    res.status(500).json({ Error: "server error on the getFeaturProduct" });
  }
};
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await ProductData.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url || "",
            category,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error in createProduct controller:", error); // Log full error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deletProduct = async (req, res) => {
	try {
		const product = await ProductData.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await ProductData.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
export const  recommendationProduct=async (req,res)=>{
     try {
          const Product =await ProductData.aggregate([
               {
                    $sample:{size:3}
               },
               {
                    $project:{
                         _id:1,
                         name:1,
                         description:1,
                         price:1,
                         image:1
                    }
               }
          ])
          res.json(Product)
     } catch (error) {
          console.log("the error created on the recommendation", error.message);
          res.status(500).json({ Error: "the error is occer on the recommendation server" }); 
     }
}
export const GetProductByCategory = async (req, res) => {
     const { category } = req.params;
 
     try {
         // Assuming 'category' is stored as an ObjectId in your database
         const products = await ProductData.find({ category }); // Use find() to get all products matching the category
 
         if (products.length === 0) {
             return res.status(404).json({ error: "No products found for this category" });
         }
 
         res.json({ products }); // Send the found products in the response
     } catch (error) {
         console.log("Error retrieving products by category:", error.message);
         res.status(500).json({ error: "An error occurred while retrieving products by category" });
     }
 };

export const toggleFeatcherdProduct = async (req, res) => {
     try {
         const product = await ProductData.findById(req.params.id);
         
         if (product) {
             // Toggle the isFeatured property
             product.isFeatured = !product.isFeatured;
 
             // Save the updated product
             const updatedProduct = await product.save();
 
             // Update the cache (assuming this function is defined)
             await UpdataFeaturProductCache();
 
             // Respond with the updated product
             res.json(updatedProduct);
         } else {
             res.status(404).json({ error: "Product not found" });
         }
     } catch (error) {
         console.error("Error in toggleFeaturedProduct:", error.message);
         res.status(500).json({ error: "An error occurred while toggling the featured status" });
     }
 };