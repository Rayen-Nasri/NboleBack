import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import autRoutes from  "./routes/auth.route.js"
import profileRoutes from "./routes/profile.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://noble-nurturing.netlify.app']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(cookieParser())

app.use("/api/auth" , autRoutes);
app.use("/api/profile" , profileRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log("server Work on Port : ", PORT);
});


