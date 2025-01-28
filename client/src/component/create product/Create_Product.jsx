import React, { useState } from "react";
import "./Create_product.css";
import { useProductStore } from "../../store/product_store";
import Loding from "../../page/loding";
const Create_Product = () => {
  const [newProducts, setNewproducts] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const {createProduct,loading,createdAt} =useProductStore();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProducts);
      setNewproducts({name:'',description:'',price:'',category:'',image:''})
    } catch (error) {
      console.log("the error is occer on the produte"+error)
    }


  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();

      render.onloadend = () => {
        setNewproducts({ ...newProducts, image:render.result});
      };
      render.readAsDataURL(file);
    }
  };
 
  

  return (
    <div>
      <div className="create-product-form">
        <h2>Create New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={newProducts.name}
              onChange={(e) =>
                setNewproducts({ ...newProducts, name: e.target.value })
              }
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newProducts.description}
              onChange={(e) =>
                setNewproducts({ ...newProducts, description: e.target.value })
              }
              required
              placeholder="Enter product description"
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={newProducts.price}
              onChange={(e) =>
                setNewproducts({ ...newProducts, price: e.target.value })
              }
              required
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={newProducts.category}
              onChange={(e) =>
                setNewproducts({ ...newProducts, category: e.target.value })
              }
              required
            >
              <option value="">Select a category</option>
              <option value="jackets">jackets</option>
              <option value="jeans">jeans</option>
              <option value="T-shirts">T-shirts</option>
              <option value="shoes">shoes</option>
              <option value="bags">bags</option>
              <option value="suits">suits</option>
              <option value="glasses">glasses</option>
             
            </select>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" onChange={imageHandler} accept="image/*" />
          </div>

          <button type="submit" className="submit-button">
            {loading?<Loding/>: "Create Product"}
           
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create_Product;
