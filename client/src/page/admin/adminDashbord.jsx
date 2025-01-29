import React, { useState, useEffect } from "react";
import Product from "../../component/product/Product";
import Create_Product from "../../component/create product/Create_Product";
import "./AdminDashboard.css";
import { useProductStore } from "../../store/product_store";
const tabs = [
  { id: "create", lable: "Creat Product" },
  { id: "Products", lable: "Products" },
];
const AdminDashbord = () => {
  const { fetchAllProducts } = useProductStore();
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  
  const [tabsActivity, setTabsActivit] = useState("create");
  return (
    <div className="">
      <div className="second_contener">
        {tabs.map((each) => (
          <button
          
            key={each.id}
            onClick={() => {
              setTabsActivit(each.id);
            }}
            className={tabsActivity === each.id ? "active " : ""}
          >
            {each.lable}
          </button>
        ))}
      </div>

      {tabsActivity === "create" && <Create_Product />}
      {tabsActivity === "Products" && <Product />}
    </div>
  );
};

export default AdminDashbord;
