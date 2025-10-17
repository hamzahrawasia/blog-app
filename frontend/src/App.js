import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AllBlogs from "./components/AllBlogs";
import UserBlogs from "./components/UserBlogs";
import BlogContent from "./components/BlogContent";
import { useSelector } from "react-redux";

function App() {
  const loggedIn = useSelector(state=> state.loggedIn);
  console.log(loggedIn);
  return (
    <React.Fragment>
    <div>
      <Header />
    </div>
    <main>
      <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/add" element={<AddBlog />} exact />
          <Route path="/blogs" element={<AllBlogs />} exact />
          <Route path="/myBlogs" element={<UserBlogs />} exact />
          <Route path="/blogs/:id" element={<BlogContent />} exact />
        </Routes>
    </main>
    </React.Fragment>
  );
}

export default App;
