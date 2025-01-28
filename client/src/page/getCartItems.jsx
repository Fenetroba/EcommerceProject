import React from "react";
import { useCartStore } from "../store/CartStore";
import { FaShoppingBag } from "react-icons/fa";
import Cartforms from "./cartForms";
import RecomandedProduct from "./RecomandedProduct";
import { Link } from "react-router-dom";
import OrderSummary from "../component/OrderSummary";
import "../page/page Css/getCartItems.css";
import empty from '../component/assets/shopping.png'
const GetcartItem = () => {
  const { cart } = useCartStore();
  return (
    <div className="">
      <div  className="row row-cols-1 row-cols-md-3 g-4 mx-2  my-2">
        {cart.length === 0 ? (
          <Empity />
        ) : (
              cart.map((cart) => (
                <Cartforms key={cart._id} cart={cart} />
              ))
          
        )}
        {cart.length > 0 && <OrderSummary />}
      </div>

      
      <div >
  
</div>





      {cart.length > 0 && <RecomandedProduct />}
    </div>
  );
};
const Empity = () => {
  return (
    <div className="emapty">
      <div className="empity_contener">
        <h1>No Producta</h1>
        <FaShoppingBag style={{ fontSize: "50px" }} />
        {/* <img src={empty} alt="empty" /> */}
        <Link to="/">Add To cart</Link>
      </div>
    </div>
  );
};
export default GetcartItem;

