import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import '../page/page Css/RecomandedProduct.css'
const RecomandedProduct = () => {
  const [recommand, setrecommand] = useState([]);
  useEffect(() => {
    const recommandFetch = async () => {
      try {
        const res = await axios.get("/product/recommendation");
        setrecommand(res.data);
      } catch (error) {
        toast.error(
          error.response.data.message || "the error occered in recommand "
        );
      }
    };
    recommandFetch();
  }, []);
  return (
    <div className="recomand">
      <h1 className="header_items">Relational Items</h1>
    <div className="recomande_contener">
      {recommand.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
    </div>
  );
};

export default RecomandedProduct;
