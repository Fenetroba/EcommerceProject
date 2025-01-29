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

import heroIner from "../component/assets/hero1.png";
import hero from "../component/assets/Scrolled_Image/heros.jpg";
import { useProductStore } from "../store/product_store";
import FeaturedProducts from "../component/FeaturedProducts";

const Home = () => {
  const { fetchFeaturedProducts, loading, products } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  window.addEventListener(
    "scroll",
    () => {
      document.body.style.setProperty(
        "--scroll",
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      );
    },
    false
  );
  return (
    <div className="homePage_contener">
      <h1 className="container-fluid  bg-dark text-light p-2 shadow-lg text-center">
          Selame Shop{" "}
          <span className="font-weight-900 "> And Cloth Collection</span>
        </h1>
        <div className="gallery container">
          <img
            src="https://www.ethiopian.store/cdn/shop/files/1000009131.jpg?v=1727190386&width=360"
            alt="a house on the mountain"
          />
          <img
            src="https://www.ethiopian.store/cdn/shop/files/photo_2024-02-05_03-11-56-390211.jpg?v=1716292025&width=360"
            alt="a big building"
          />
          <img src="https://www.ethiopian.store/cdn/shop/files/419899278_356365780439814_3692626088588344163_n_heic.jpg?v=1707137870&width=360" alt="another house" />
          <img
            src="https://www.ethiopian.store/cdn/shop/files/photo_2024-12-10_12-32-11_2.jpg?v=1733922056&width=360"
            alt="a small road between two houses"
          />
          <img
            src="https://www.ethiopian.store/cdn/shop/files/1735109237027.jpg?v=1735112428&width=360"
            alt="a modern city"
          />
          <img
            src="https://www.ethiopian.store/cdn/shop/files/photo_2024-12-06_09-08-21.jpg?v=1733469158&width=360"
            alt="a lot of old houses"
          />
        </div>
      <div className="magicpatternhome table-hover">
        

     
      </div>

      <h1 className="ourProducts">Shop by category</h1>
      <div className="home_contener" id="home_contener">
        {categories.map((each) => (
          <Category key={each.name} CategoryEach={each} />
        ))}
      </div>

      <h1 className="text-bg-danger mx-lg-2 col-12 text-center flex-fill align-content-center mt-4">
        Featured Products{" "}
      </h1>
      <div className="container-fluid text-center md-720px ">
        {!loading && products.length > 0 && (
          <FeaturedProducts FeaturedProducts={products} />
        )}
      </div>
    </div>
  );
};

export default Home;
