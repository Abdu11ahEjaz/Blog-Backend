import express from "express";
import connDB from "../config/db.js";
import dotenv from 'dotenv';
import postRoutes from '../routes/postRoutes.js';
import cors from 'cors';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
connDB();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/api/posts', postRoutes);

app.use('/', (req, res) => {
  res.send("Backend Server is running");
});

export default serverless(app);
