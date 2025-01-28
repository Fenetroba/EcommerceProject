import React from "react";
import { useProductStore } from "../../store/product_store";
import "./product.css";

const Product = () => {
  const { products, toggleFeaturedProduct, deleteProduct,createdAt } = useProductStore();

  
  console.log("products", products);
  return (
    <div className="top_contener">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>FEATURED</th>
            <th>ACTIONS</th>
            <th>Post Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="product_image">
                <img src={product.image} alt={product.name} />
              </td>
              <td className="product_price" scope="row">{product.price}</td>
              <td className="product_category" scope="row">{product.category}</td>
              <td className="product_featur" scope="row">
                <button
                  className={product.isFeatured ? "actives" : ""}
                  onClick={() => toggleFeaturedProduct(product._id)}
                >
                  ⭐
                </button>
              </td>

              <td className="product_featur">
                <button
                  className="product_delete"
                  onClick={() => deleteProduct(product._id)}
                >
                  🧹
                </button>
              </td>
              <td>{product.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
