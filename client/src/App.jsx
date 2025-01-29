import React, { useEffect } from "react"; // Import React and useEffect hook
import "./App.css"; // Import CSS styles for the app
import { Routes, Route, Navigate } from "react-router-dom"; // Import routing components from react-router-dom
import Home from "./page/Home"; // Import Home component
import Login from "./page/Login"; // Import Login component
import Signup from "./page/Signup"; // Import Signup component
import Nav from "./component/Nav"; // Import Navigation component
import toast, { Toaster } from "react-hot-toast"; // Import Toaster for displaying notifications
import { userUserStore } from "./store/userUser_store"; // Import user store for authentication state management
import AdminDashbord from "./page/admin/adminDashbord"; // Import Admin Dashboard component
import UserCart from "./page/userCart/UserCart"; // Import User Cart component (not used in this code)
import CategoryPage from "./page/categoryPage";
import GetcartItem from "./page/getCartItems";
import { useCartStore } from "./store/CartStore";
import Footer from "./component/footer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
// import '../node_modules/bootswatch/dist/slate/bootstrap.min.css';
import { Button } from "react-bootstrap";


// Main App component
const App = () => {
  const location = useLocation();
  const { user, checkAuth,loading } = userUserStore(); // Destructure user and checkAuth from the user store
  const { getCartItems } = useCartStore();
  // Effect hook to check authentication status on component mount
  useEffect(() => {
    checkAuth(); // Call checkAuth to verify user authentication status
  }, [checkAuth]); // Dependency array to run the effect when checkAuth changes
  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);
  return (
    <div className="app_Top App contener-fluid">


      <div className="app_componet">
        {" "}
        {/* Container for components */}
        <Nav /> {/* Render the Navigation component */}
        <Routes>
          {" "}
          {/* Define application routes */}
          
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />} // Redirect to Home if user is already logged in
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />} // Redirect to Home if user is already logged in
          />
          <Route
            path="/Admin_dashbord"
            element={
              user?.role === "admin" ? (
                <AdminDashbord />
              ) : (
                <Navigate to="/Login" />
              )
            } // Admin Dashboard route; redirect if user is not an admin
          />
            <Route path="/category/:Category" element={<CategoryPage />} />
        
          <Route
            path="/cart"
            element={user ? <GetcartItem /> : <Navigate to="/Login" />}
          />
        
        </Routes>
        {location.pathname === "/Admin_dashbord" ? null  : <Footer />}
      </div>

      <Toaster  zIndex={99999} toastOptions={{ duration: 3000 }}/> 

    </div>
  );
};

export default App; // Export App component as default
