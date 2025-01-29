import React, { useEffect } from 'react'
import { useCartStore } from '../store/CartStore'
import '../page/page Css/cartform.css'
import { useProductStore } from '../store/product_store';
import { AiFillDelete } from 'react-icons/ai';
const Cartforms = ({cart}) => {
     const {updateQuantity, removeFromCart}=useCartStore();
  const {createdAt} =useProductStore();

    
  return (
    
  
     <div className="col">
    <div className="card h-100 cartform_contener">
      <img src={cart.image}  alt="image"/>
      <div className="card-body">
        <h5 className="card-title">Price: {cart.price * cart.quantity}</h5>
        <p className="card-text">Description :{cart.description}</p>
        <span>{cart.quantity}</span>
        <button  onClick={()=>{updateQuantity(cart._id,cart.quantity-1)}} >-</button>
        <button onClick={()=>{updateQuantity(cart._id,cart.quantity+1)}} >+</button>
        <button onClick={()=>removeFromCart(cart._id)} >Delete <AiFillDelete style={{color:'black'}}/></button>


      </div>
      <div className="card-footer">
        <small className="text-body-secondary">Posted Date :{cart.createdAt}</small>
      </div>
    </div>

  
    </div>
  )
}

export default Cartforms