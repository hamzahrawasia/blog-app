import express, { Router } from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(blogRouter);

mongoose.connect('mongodb+srv://admin:lT7TZWk7CSnNEEjf@cluster0.phjlbst.mongodb.net/?retryWrites=true&w=majority'
).then(() => app.listen(5001)).then(() => console.log("connected")).catch((err) => console.log(err));

