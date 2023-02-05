import "./App.css";
import { Route, Routes } from "react-router-dom";

import BlogCard from "./components/BlogCard/BlogCard";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import UsersInfo from "./components/UsersInfo/UsersInfo";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cardData, setCardData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8080/blog/get-all-blogs"
    );
    

    setCardData((data) => {
      data = [...data, ...response.data.blogs];
    });
    console.log("card data array: ", cardData);
    console.log("card data print ", response.data.blogs);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/blogs" element={<BlogCard />}></Route>
        <Route path="/users" element={<UsersInfo />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signUp" element={<SignUpForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
