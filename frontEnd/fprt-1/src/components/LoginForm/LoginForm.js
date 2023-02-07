import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import formBgImage from "../../Images/formBg.svg";
import axios from "axios";

const baseURL = "http://localhost:8080";

function LoginForm(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginService = async (payload) => {
    const res = await axios.post(`${baseURL}/user/sign-in`, payload);
    // console.log(res.data, "0000000000000");
    return res;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await loginService(formData);
    await localStorage.setItem("token", data.token);
    const token = await localStorage.getItem("token");
    setIsLoading(false);
    console.log("token----******--->", token);
    console.log("is loading:---*****************",isLoading);

    if (!isLoading && token) {
      setIsLoggedIn(true);
      console.log("login status*************************", isLoggedIn);
      navigate("/");
    } else {
      alert("Something went wrong!!");
    }
  };

  return (
    <section className="login">
      <div className="login_box">
        <div className="left">
          <div className="top_link">
            <Link to="/">
              <img src={formBgImage} alt="" />
              Return home
            </Link>
          </div>

          <div className="contact">
            <form onSubmit={submitHandler}>
              <h3>SIGN IN</h3>
              <input
                name="email"
                value={formData.email}
                type="email"
                placeholder="USERNAME"
                onChange={onChangeInput}
              />
              <input
                name="password"
                value={formData.password}
                type="password"
                placeholder="PASSWORD"
                onChange={onChangeInput}
              />
              <button type="submit" className="submit">
                LET'S GO
              </button>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="right-text">
            <h2>The Tech Geek</h2>
            <h5>A Technical Blogging Website</h5>
          </div>
          <div className="right-inductor">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
