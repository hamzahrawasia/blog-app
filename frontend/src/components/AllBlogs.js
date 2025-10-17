import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const URL = "http://localhost:5001/blogs";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios.get(URL).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  },[])
  console.log(blogs);
    return (
        <div>
         { blogs && blogs.map((blog,index) => (
          <Blog
           isUser={localStorage.getItem("userID")===blog.user._id}
           title={blog.title}
           description={blog.description} 
           imageURL={blog.image} 
           username={blog.user.name} 
           />
         ))}
      </div>
    )
}

export default AllBlogs