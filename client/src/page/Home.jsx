const categories = [
  {
    href: "/jeans",
    name: "Jeans",
    description: "the oldest and new jeans get to her",
    imageUrl: "/jeans.jpg",
  },
  {
    href: "/bags",
    name: "Bags",
    description: " oldest and new Bags get to her",
    imageUrl: "/bags.jpg",
  },
  {
    href: "/shoes",
    name: "Shoes",
    description: " oldest and new Bags get to her",
    imageUrl: "/shoes.jpg",
  },
  {
    href: "/glasses",
    name: "Glasses",
    description: " many type of  glasses get to her",
    imageUrl: "/glasses.png",
  },
  {
    href: "/jackets",
    name: "Jackets",
    description: " oldest and new jackets get to her",
    imageUrl: "/jackets.jpg",
  },
  {
    href: "/suits",
    name: "Suits",
    description: " many desgn suits get to her",
    imageUrl: "/suits.jpg",
  },
  {
    href: "/t-shirts",
    name: "T-shirts",
    description: " new brand T-shirts get to her",
    imageUrl: "/tshirts.jpg",
  },
];
import "./page Css/home.css";
import React, { useEffect } from "react";
import Category from "../component/Category";

import heroIner from'../component/assets/hero1.png'
import hero from'../component/assets/Scrolled_Image/heros.jpg'
import { useProductStore } from "../store/product_store";
import FeaturedProducts from "../component/FeaturedProducts";


const Home = () => {
const {fetchFeaturedProducts,loading,products}=useProductStore();


useEffect(()=>{
  fetchFeaturedProducts()
},[fetchFeaturedProducts])
  window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);
  return (
    <div className="homePage_contener">
    
      <div className="magicpatternhome table-hover trans">
        
      <h1 className= "w-90  bg-dark text-light p-5 shadow-lg text-center">Selame Tradational <span className="font-weight-900 ">Cloth Collection</span></h1>
       
      </div>

      <h1 className="ourProducts">Shop by category</h1>
      <div className="home_contener" id="home_contener">
        {categories.map((each) => (
          <Category key={each.name} CategoryEach={each} />
        ))}
      </div>

      <h1 className='text-bg-danger mx-lg-2 col-12 text-center flex-fill align-content-center mt-4'>Featured Products </h1>
      <div className='container-fluid text-center md-720px '>
        {!loading && products.length >0 &&<FeaturedProducts FeaturedProducts={products}/>}
          
      </div>




    </div>
  );
};

export default Home;
