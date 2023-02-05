import React from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";

// onclick="document.getElementById('id01').style.display='block'" style="width:auto;"
function LoginForm() {
  return (
    <div>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <Link to="/">
                <img
                  src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
                  alt=""
                />
                Return home
              </Link>
            </div>

            <div className="contact">
              <form action="">
                <h3>SIGN IN</h3>
                <input type="text" placeholder="USERNAME" />
                <input type="text" placeholder="PASSWORD" />
                <button className="submit">LET'S GO</button>
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

export default LoginForm;
