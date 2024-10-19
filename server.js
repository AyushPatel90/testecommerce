// const express=require('express')
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from 'morgan'
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// configure env
dotenv.config();

//database config
connectDB();

// rest object
const app=express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)
//rest api
// app.get('/',(req,res)=>{
//     res.send("<h1>welcome to ecom</h1>"  
//     )
// })
app.use(express.static(path.join(__dirname , './client/build')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname ,'./client/build/index.html'))
});

//port
const Port=process.env.PORT || 8080;

//run listen
app.listen(Port,()=>{
})
