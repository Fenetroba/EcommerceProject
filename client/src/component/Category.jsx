import React from "react";
import "../page/page Css/home.css";
import { Link } from "react-router-dom";
const Category = ({ CategoryEach }) => {
  return (
    <div className="category_contener">
      <Link to={"/category" + CategoryEach.href}>
        <div className="category">
          <img src={CategoryEach.imageUrl} alt={CategoryEach.name} />
          <div className="text">
            <h3> {CategoryEach.name}</h3>
            <p>{CategoryEach.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Category;
