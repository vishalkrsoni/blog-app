import React from "react";
import "./BlogAddForm.css";

function BlogAddForm() {
  return (
    <div>
      <form className="my-form">
        <div className="container">
          <h1>Add Blog!</h1>
          <ul>
            <li>
              <div className="grid ">
                <input type="text" placeholder="Blog Title" required />
              </div>
            </li>
            <li>
              <div className="grid ">
                <input type="text" placeholder="Description" required />
              </div>
            </li>
            <li>
              <textarea placeholder="Write your content here"></textarea>
            </li>

            <li>
              <div className="grid grid-3">
                <div className="required-msg">REQUIRED FIELDS</div>
                <button className="btn-grid" type="submit">
                  <span className="back">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/email-icon.svg"
                      alt=""
                    />
                  </span>
                  <span className="front">SUBMIT</span>
                </button>
                <button className="btn-grid" type="reset">
                  <span className="back">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/eraser-icon.svg"
                      alt=""
                    />
                  </span>
                  <span className="front">RESET</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default BlogAddForm;
