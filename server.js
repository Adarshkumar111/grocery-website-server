import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import dotenv from "dotenv";
import sellerRouter from './routes/seller.routes.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import addressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';
dotenv.config();


const app=express()
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Allow multiple origin

const allowedOrigimms=['http://localhost:5173']

// middleware configuraation
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigimms, Credential:true}))

// router
app.get('/', (req, res)=>res.send("API is working"))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/seller', sellerRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/address', addressRouter)
app.use('/api/v1/order', orderRouter)



app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})