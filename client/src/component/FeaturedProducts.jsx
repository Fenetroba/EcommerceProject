import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import { userUserStore } from "../store/userUser_store";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const FeaturedProducts = ({ FeaturedProducts }) => {

  const { addToCart } = useCartStore();
  const { user } = userUserStore();
  

  
  return (
    <div className="row align-items-start"  >
      {FeaturedProducts.map((product) => (
        <div key={product._id}  className="col-3 min-vh-50 border">
          <div className="col-12">
            <img
              className="img-fluid "
              src={product.image}
              alt={product.name}
		   
            />
          </div>
          <div>
            {product.name}
            <p>{product.description}</p>
          </div>

          <button
            className="btn btn-dark badge  text-wrap p-2 w-100"
            onClick={
              user
                ? () => addToCart(product)
                : () => toast.error("First Login or Sign Up")
            }
          >
            Add To Cart
          </button>
        </div>
      ))}
     </div>
  );
};

export default FeaturedProducts;
