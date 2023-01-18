import express from "express";
import { getBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } from "./blog-functions";

const blogRouter = express.Router();
blogRouter.get("/blogs", getBlogs)
blogRouter.post("/add", addBlog)
blogRouter.put("/update/:id", updateBlog)
blogRouter.get("/:id", getById)
blogRouter.delete("/:id", deleteBlog)
blogRouter.get("/user/:id", getByUserId)

export default blogRouter;