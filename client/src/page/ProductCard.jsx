import React from "react";
import { toast } from "react-hot-toast";
import { userUserStore } from "../store/userUser_store";
import { useCartStore } from "../store/CartStore";
import "./page Css/product.css";
const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { user } = userUserStore();
  const addToCarts = () => {
    if (!user) {
      toast.error("Pleace First You have To login", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
    
  }
  return (
    <div className="product_top_contener">
      <img src={product.image} alt={product.name} className="Product_Image" />
      <div className="aboutProduct">
        <h1 className="productName">Name: {product.name}</h1>
        <p className="ProductDiscription">Description: {product.description}</p>
        <p className="ProductPrice">Price: {product.price}</p>
        <button onClick={addToCarts} className="AddtocartBtn">
          Add Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
