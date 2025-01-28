import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	total: 0,
	subtotal: 0,
	

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error.response.data.message || "An error occurred ");
		}
	},
	clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},

	addToCart: async (product) => {
		try {
		    // Ensure product._id is valid before proceeding
		    if (!product || !product._id) {
			   throw new Error("Product ID is missing");
		    }
	 
		    console.log("Adding product with ID:", product._id);
	 
		    // Make the POST request to add the product to the cart
		    await axios.post("/cart", { productId: product._id });
		    toast.success("Product added to cart");
	 
		    // Update local state with the new cart
		    set((prevState) => {
			   const existingItem = prevState.cart.find((item) => item._id === product._id);
			   const newCart = existingItem
				  ? prevState.cart.map((item) =>
					 item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
				    )
				  : [...prevState.cart, { ...product, quantity: 1 }];
				  
			   return { cart: newCart };
		    });
	 
		    // Calculate totals after updating cart
		    get().calculateTotals();
		} catch (error) {
		    // Log the error for debugging purposes
		    console.error("Error adding to cart:", error);
	 
		    // Provide a user-friendly error message
		    const errorMessage = error.response?.data?.message || "An error occurred while adding to cart";
		    toast.error(errorMessage);
		}
	 },

	removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},
	calculateTotals: () => {
		const { cart, coupon } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}

		set({ subtotal, total });
	},
}));
