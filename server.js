import express from "express";
import connDB from "./config/db.js";
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js'
import cors from 'cors';

dotenv.config();


const app = express();
connDB();

app.use(express.json());

app.use(cors({
  origin: 'http://192.168.1.15:5173', // Replace with your Frontend PC’s IP
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/posts',postRoutes);

  
const PORT = process.env.PORT || 3000 ; 
app.listen(PORT,'0.0.0.0' ,() =>{
console.log(`App is running on http://0.0.0.0:${PORT}`); 
});
 