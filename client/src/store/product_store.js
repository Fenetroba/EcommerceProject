import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,
	createdAt:'',

	setProducts: (products) => set({ products }),
	
	createProduct: async (productData) => {
		set({ loading: true }); // Set loading to true at the start
		try {
		    // Get the current date
		    const now = new Date();
		    
		    // Format the date to 'YYYY-MM-DD'
		    const createdAt = now.toISOString().split('T')[0]; // Extract just the date part
		    
		    const newProductData = {
			   ...productData,
			   createdAt: createdAt, // Set createdAt to the formatted date
		    };
	 
		    const res = await axios.post("/product", newProductData);
		    
		    // Update the products state with the newly created product
		    set((prevState) => ({
			   products: [...prevState.products, res.data],
			   loading: false,
		    }));
	 
		    // Optionally, show a success message
		    toast.success("Product created successfully!");
		} catch (error) {
		    // Handle different error responses
		    const errorMessage = error.response?.data?.error || "An error occurred while creating the product.";
		    toast.error(errorMessage);
		    console.error("Error creating product:", error);
		    
		    // Set loading to false in case of an error
		    set({ loading: false });
		}
	 },
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
		    const response = await axios.get("/product");
		    // Check if the expected data structure exists
		    if (response.data && response.data.products) {
			   set({ products: response.data.products, loading: false });
		    } else {
			   throw new Error("Unexpected response structure");
		    }
		} catch (error) {
		    console.error(error); // Log the error for debugging
		    set({ error: "Failed to fetch products", loading: false });
		    toast.error(error.response?.data?.error || "Failed to fetch products");
		}
	 },
	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/product/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/product/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
		    const response = await axios.patch(`/product/${productId}`);
	 
		    // Log the response to see its structure
		    console.log("Response from server:", response.data);
	 
		    // Check if response data contains the expected property
		    if (response.data && typeof response.data.isFeatured !== 'undefined') {
			   // Update the isFeatured prop of the product
			   set((prevProducts) => ({
				  products: prevProducts.products.map((product) =>
					 product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				  ),
				  loading: false,
			   }));
		    } else {
			   throw new Error("Unexpected response structure");
		    }
		} catch (error) {
		    set({ loading: false });
	 
		    // Improved error handling
		    const errorMessage = error.response?.data?.error || "Failed to update product";
		    toast.error(errorMessage);
		    console.error("Error updating product:", error); // Log the entire error for debugging
		}
	 },
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/product/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}));
