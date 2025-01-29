import React, { useState } from "react";
import "./page Css/login.css";
import { FaArrowRight, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userUserStore } from "../store/userUser_store";
import Loding from "./loding";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login,loading}=userUserStore()
  const submitHundler = (e) => {
    e.preventDefault();
    login(email,password)
    console.log(email,password)
  };
  return (
    <div className="login_top container-fluid">
      <div className="login_contener">
        <form onSubmit={submitHundler} className="login_form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="YouEmail@gmail.com"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <button className="LodingBtn">
          
           {loading?<Loding/>:<div>  <FaUserFriends /> Login</div>} 
          </button>
          <div className="directLogiOrSign">
          I Am Not A Member ?
          <Link to="/signup">
          Sign Up
          </Link>
        </div>
        </form>
       
      </div>
<div className="magicpattern"></div>
    </div>
  );
};

export default Login;
