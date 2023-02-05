import "./Header.css";
import React from "react";
import Logo from "../../Images/myLogo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header__container">
      <div className="header__contents">
        <a href="#default" className="header__logo">
          <img
            src={Logo}
            alt="logo"
            width={350}
            height={150}
            className="company__logo"
          />
        </a>
        <div className="header-right">
          <Link to="/" className="header__tab home__tab active">
            Home
          </Link>
          <Link to="users" className="header__tab mentors__tab ">
            Users
          </Link>
          <Link to="blogs" className="header__tab testimonial__tab ">
            Blogs
          </Link>
          <Link to="login" className="header__tab login__tab ">
            Login
          </Link>
          <Link to="signUp" className="header__tab signup__tab ">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
