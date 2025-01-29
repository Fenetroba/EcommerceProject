import React from "react";
import "./page Css/home.css";
import { useProductStore } from "../store/product_store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import ProductCard from "./ProductCard";
import empty from '../component/assets/shopping.png'


const CategoryPage = () => {
  const { Category } = useParams();
  const { fetchProductsByCategory, products } = useProductStore();
    
  useEffect(() => {
    fetchProductsByCategory(Category);
    
  }, [fetchProductsByCategory]);

  return (
    <div className="allconten">
      <h2>{Category.charAt(0).toUpperCase() + Category.slice(1)}</h2>

      {products?.length === 0 && (
        <div className="category_page_contener">
          <div className="noFoundProduct">
            <div className="nofoundContener">
              <span>collection is not Found</span>
              {/* <AiOutlineClear style={{ color: "red" }} /> */}
                      <img src={empty} alt="empty" style={{width:"200px"}}/>
            </div>
          </div>
        </div>
      )}
<div className="allproduct_items">
      {products?.map((product) => (
        <div className="try" key={product._id}>
          <ProductCard key={product._id} product={product} />
        </div>
        
      ))}
      </div>
    </div>
  );
};

export default CategoryPage;
