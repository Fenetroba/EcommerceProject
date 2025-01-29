import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../page/page Css/nav.css";
import logo from "../component/assets/model-24481_640.png";
import {
  FaCartPlus,
  FaHamburger,
  FaHome,
  FaRegArrowAltCircleRight,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserFriends,
  FaUserLock,
} from "react-icons/fa";
import { userUserStore } from "../store/userUser_store";
import { useCartStore } from "../store/CartStore";

const Nav = () => {
  const { cart } = useCartStore();
  const { user, logout } = userUserStore();
  const isAdmin = user?.role === "admin";
  const [diaplayMenu, setDisplayMenu] = useState(false);
  const menuhandler = () => {
    setDisplayMenu(!diaplayMenu);
  };
  const [scrolled, setScrolled] = useState(false); 
  const handleScroll = () => {
      if (window.scrollY > 50) {
          setScrolled(true); 
      } else {
          setScrolled(false); 
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className={` nav_bar_top" ${scrolled ? 'scrolled nav_bar_top' : 'nav_bar_top'}`}>
      <FaHamburger className="menuBar" onClick={menuhandler} />
      {/* style={diaplayMenu?{display:"none"}:{display:"block"}} */}
      <div className={diaplayMenu?'navigation_header block':'none'}>
        <nav className="navigation_bar_contener topcontener">
 
          <Link to="/" className="header_logo">
            <img src={logo} alt="logo" />
          </Link>
  
  <div className="navigation_bar_contener second_conteners">
          <Link to="/" className="navHome">Home <FaHome style={{color:"var(--therd_color)"}}/> </Link>
          {user && (
            <Link to="/cart">
              <div className="cart_contener1">
                <FaCartPlus /> Cart
                {cart.length > 0 && (
                  <span className="cart_number">{cart.length}</span>
                )}
              </div>
            </Link>
          )}
          {isAdmin && (
            <Link to="./Admin_dashbord">
              <div className="is_admin_contener">
                DashBoard <FaUserLock />
              </div>
            </Link>
          )}

          {user ? (
            <div className="user_is_IN">
              <button onClick={logout}>
                Log Out <FaSignInAlt className="logoutIcon" />
              </button>
            </div>
          ) : (
            <div className="user_is_notIn">
              <Link to="/login" className="loginClass" >
                <FaSignOutAlt /> Login
              </Link>
              <Link to="/signup" className="signupclass" >
                <FaUserFriends /> Sign Up
              </Link>
            </div>
            
          )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
