import React, { useState } from "react";
import "./page Css/signUp.css";
import { FaArrowRight, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userUserStore } from "../store/userUser_store.js";
import Loding from "./loding.jsx";
const Signup = () => {
  const [form, setForm] = useState({
    Username: "",
    password: "",
    email: "",
    ConfirmPassword: "",
  });
  const { signUp ,loading } = userUserStore();
  const submitHundler = (e) => {
    e.preventDefault();
    signUp(form);
    console.log(form);
  };
  return (
    <div className="signup__top">
      <div className="signup_contener">
        <h2>Create an Account</h2>
        <form onSubmit={submitHundler} className="signUp_form">
          <label>Full Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="Fenet Roba"
            value={form.name}
            onChange={(e) => setForm({ ...form, Username: e.target.value })}
          />
          <label>Email Address</label>
          <input
            type="email"
            placeholder="YouEmail@gmail.com"
            id="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder=".........."
            id="confirmPassword"
            required
            value={form.ConfirmPassword}
            onChange={(e) =>
              setForm({ ...form, ConfirmPassword: e.target.value })
            }
          />

          <button className="LodingBtn">
            {loading ? (
              <Loding />
            ) : (
              <div>
                <div>
                  <FaUserFriends /> Sign Up
                </div>
              </div>
            )}
          </button>
          <div className="directLogiOrSign">
            Alredy Have an Account ? <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
      <div className="magicpattern"></div>
    </div>
  );
};

export default Signup;
