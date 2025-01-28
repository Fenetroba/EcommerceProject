import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

// Create a store using Zustand for managing user authentication state
export const userUserStore = create((set) => ({
	user: null,               // Initial state of the user is null (not logged in)
	loading: false,           // Loading state to indicate ongoing requests
	checkingAuth: true,          // Flag to check if authentication status is being verified
 
	// Function for user sign-up
	signUp: async ({ Username, email, password, ConfirmPassword }) => { 
	    set({ loading: true });  // Set loading state to true
	 
	    // Check if the password and confirm password match
	    if (password !== ConfirmPassword) {
		   set({ loading: false });  // Set loading state to false if passwords don't match
		   return toast.error("Passwords do not match"); // Show error message
	    }
	 
	    try {
		   // Send a POST request to the sign-up endpoint
		   const res = await axios.post("/auth/signup", { Username, email, password });
		   set({ user: res.data, loading: false }); // Set user state with response data and stop loading
	    } catch (error) {
		   set({ loading: false }); // Stop loading on error
		   toast.error(error.response.data.message || "An error occurred"); // Show error message
	    }
	},
 
	// Function for user login
	login: async (email, password) => {
	    set({ loading: true }); // Set loading state to true
	    
	    try {
		   // Send a POST request to the login endpoint
		   const res = await axios.post("/auth/login", { email, password });
		   set({ user: res.data, loading: false }); // Set user state with response data and stop loading
	    } catch (error) {
		   set({ loading: false }); // Stop loading on error
		   toast.error(error.response.data.message || "An error occurred"); // Show error message
	    }
	},
 
	// Function for user logout
	logout: async () => {
	    try {
		   await axios.post("/auth/logout"); // Send a POST request to the logout endpoint
		   set({ user: null }); // Set user state to null (user logged out)
	    } catch (error) {
		   toast.error(error.response?.data.message || "The error occurred on logout"); // Show error message
	    }
	},
 
	// Function to check user authentication status
	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
 }))
 let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = userUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				userUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
