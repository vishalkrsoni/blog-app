import React from "react";
import "./HomePage.css";
import BlogCard from "../../components/BlogCard/BlogCard";

function HomePage({ cardData }) {
  return <BlogCard cardData={cardData} />;
}

export default HomePage;
