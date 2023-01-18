import Blog from"../models/Blogs";
import User from "../models/Users";
import mongoose from 'mongoose';
export const getBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (err) {
        console.log(err)
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found"});
    }
    return res.status(200).json({ blogs });
}

export const addBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;

    try {
        existingUser = await User.findById(user);
    }
    catch (err) {
        console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Cannot Find User"});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message: err});
    }
    return res.status(201).json({blog});
}

export const updateBlog = async(req, res, next) => {
    const { title, description } = req.body;

    const blogId = req.params.id;
    
    let newBlog;

    try{
        newBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        
        })
    }
    catch(err){
        console.log(err)
    }
    if (!newBlog){
        return res.status(500).json({ message: "Blog Could not be Updated"});
    }

    return res.status(200).json( {newBlog} )

}

export const getById = async(req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        console.log(err)
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blogs Found"});
    }
    return res.status(200).json({ blog });
}

export const deleteBlog = async(req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err)
    }
    if (!blog) {
        return res.status(400).json({ message: "Could Not Delete"});
    }
    return res.status(200).json({ message: "Successfully Deleted" });
}

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        console.log(err)
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blogs Found"});
    }
    return res.status(200).json({ blogs:userBlogs });
}
