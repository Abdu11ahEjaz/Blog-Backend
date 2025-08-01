import express from "express";
import connDB from "./config/db.js";
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js'
import cors from 'cors';
import serverless from 'serverless-http';

dotenv.config();


const app = express();
connDB();

app.use(express.json());

// app.use(cors());
// Configure CORS to allow all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true, // Enable if sending cookies or auth headers (optional)
  })
); 

// Handle pre-flight OPTIONS requests
// app.options("*", cors());

app.use('/api/posts',postRoutes);

app.use('/',(req,res) =>{
  try {
    res.send("Backend Server is running")
  } catch (error) {
    console.log('Server not running');
  }
} );
 
export const handler = serverless(app);
 
// const PORT = process.env.PORT || 3000 ; 
// app.listen(PORT,'0.0.0.0' ,() =>{
// console.log(`App is running on ${PORT}`); 
// });  
        

  


  



 


// import express from "express";
// import connDB from "./config/db.js";
// import dotenv from "dotenv";
// import postRoutes from "./routes/postRoutes.js";
// import cors from "cors";

// dotenv.config();

// const app = express();
// connDB();

// app.use(express.json());

// // Define allowed origins
// const allowedOrigins = [
//   "http://192.168.1.16:5173", // Local frontend on another PC
//   "http://localhost:5173", // Optional: For local testing on the same machine
//   // Replace with your deployed frontend URL (if applicable)
// ];

// // Configure CORS
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (e.g., Postman, mobile apps)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Enable if you need to send cookies or auth headers
//   })
// );

// // Routes
// app.use("/api/posts", postRoutes);

// // Default route
// app.use("/", (req, res) => {
//   res.send("Backend is Running");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`App is running on ${PORT}`);
// });   