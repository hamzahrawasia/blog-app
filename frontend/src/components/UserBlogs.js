import React, { useEffect, useState } from "react";
import axios from 'axios';
import Blog from "./Blog";

const UserBlogs = () => {
    const [user, setUser] = useState();
    const id = localStorage.getItem("userID");
    const sendRequest = async() => {
        const res = await axios.get(`http://localhost:5001/user/${id}`).catch((err)=>console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        sendRequest().then((data)=>setUser(data.user));
    },[]);
    console.log(user);
    return (
        <div>
            { user && user.blogs && user.blogs.map((blog,index) => (
          <Blog 
          key={index} 
          title={blog.title} 
          description={blog.description} 
          imageURL={blog.image} 
          username={user.name} />
         ))}
        </div>
    );
}

export default UserBlogs;