// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import connectDB from './config/db.js'

// const app = express()
// app.use(express.json())
// app.use(cors())
// dotenv.config()

// const PORT = process.env.PORT || 3000

// app.get("/", (req, res)=>{
//   res.send("welcome madisha API!")
// })

// app.listen(PORT, ()=>{
//   connectDB()
//   console.log(`Server is running on http://localhost:${PORT}`)
// })

// 
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import  connectDB from "./config/db.js";
import authroutes from './routes/userRoutes.js';
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`)

})