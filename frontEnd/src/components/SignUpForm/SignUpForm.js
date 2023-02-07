import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formBg from '../../Images/formBg.svg'
const baseURL = "http://localhost:8080";

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setFormData({ ...formData, [name]: value });
  };
  const postRegister = async (payload) => {
    const res = await axios.post(`${baseURL}/user/sign-up`, payload);
    console.log(res.data.message,'sign up message');
    alert(res.data.message);
    return res;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData, "payload");
    postRegister(formData);
  };

  return (
    <div>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <Link to="/">
                <img src={formBg} alt="" />
                Return home
              </Link>
            </div>

            <div className="contact">
              <form onSubmit={submitHandler}>
                <h3>SIGN UP</h3>
                <input
                  name="fullname"
                  value={formData.fullname}
                  type="text"
                  onChange={onChangeInput}
                  placeholder="NAME"
                />
                <input
                  name="email"
                  value={formData.email}
                  type="email"
                  onChange={onChangeInput}
                  placeholder="EMAIL"
                />
                <input
                  name="password"
                  value={formData.password}
                  type="password"
                  onChange={onChangeInput}
                  placeholder="PASSWORD"
                />
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  type="password"
                  onChange={onChangeInput}
                  placeholder="CONFIRM PASSWORD"
                />
                <button className="submit" type="submit">
                  SIGN UP
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
    </div>
  );
}

export default SignUpForm;
