import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import dotenv from "dotenv";
import sellerRouter from './routes/seller.routes.js';
dotenv.config();



const app=express()
const port = process.env.PORT || 4000;

await connectDB()

// Allow multiple origin

const allowedOrigimms=['http://localhost:5173']

// middleware configuraation
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigimms, Credential:true}))

app.get('/', (req, res)=>res.send("API is working"))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/seller', sellerRouter)


app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})