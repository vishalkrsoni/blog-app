import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import UsersInfo from "./pages/UsersInfoPage/UsersInfo";
import { useEffect, useState } from "react";
import axios from "axios";
// import BlogCard from "./components/BlogCard/BlogCard";
// import PublicBlogsPage from "../src/pages/PublicBlogsPage/PublicBlogsPage";
// import BlogAddForm from "./components/BlogAddForm/BlogAddForm";

function App() {
  const [cardData, setCardData] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const getDetails = async () => {
    const usersInfo = await axios.get(
      "http://localhost:8080/home/fetch-all-users-info"
    );
    const publicBlogs = await axios.get(
      "http://localhost:8080/home/fetch-public-blogs"
    );
    return {
      usersData: usersInfo.data.usersInfo,
      publicBlogsData: publicBlogs.data.blogs,
    };
  };

  const details = async () => {
    const data = await getDetails();
    setCardData(data.publicBlogsData);
    setUsersList(data.usersData);
  };

  useEffect(() => {
    details();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage cardData={cardData} />}></Route>
        <Route path="/blogs" element={<HomePage cardData={cardData} />}></Route>
        <Route
          path="/users"
          element={<UsersInfo usersList={usersList} />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signUp" element={<SignUpForm />}></Route>
      </Routes>
    </div>
  );
}


export default App;
