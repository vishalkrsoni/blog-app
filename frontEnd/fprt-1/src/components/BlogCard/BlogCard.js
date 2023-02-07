import React from "react";
import "./BlogCard.css";
import blogBgPic from "../../Images/blogCard.jpg";
import userIcon from "../../Images/userIcon.svg";

function BlogCard({ cardData }) {
  return (
    <div className="blog__card__container">
      {cardData.map((card) => {
        return (
          <>
            <div key={card._id} className="blog__card">
              <div className="card">
                <div className="card__header">
                  <img
                    src={blogBgPic}
                    alt="card__image"
                    className="card__image"
                    width="400"
                  />
                </div>
                <div className="card__body blue__shade">
                  <span className="blog__title">{card.title}</span>
                  <h4 className="blog__description"> {card.description}</h4>
                  <p className="blog__content">{card.content}</p>
                </div>
                <div className="card__footer">
                  <div className="user__details__container ">
                    <img
                      src={
                        card.createdBy.profilePic
                          ? card.createdBy.profilePic
                          : userIcon
                      }
                      alt="user__image"
                      className="user__image"
                    />
                    <div className="user__details">
                      <h5 className="user__name">{card.createdBy.fullname}</h5>
                      <h4 className="user__job">Developer</h4>
                      <small className="user__company">Amazon.in</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default BlogCard;
