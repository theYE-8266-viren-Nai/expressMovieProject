import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js'
config()
connectDB()
const app = express()

app.get("/hello" , (req,res)=>{
    res.json({message : "Hello World"})
})

//body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//api routes
app.use("/movies" , movieRoutes)
app.use("/auth",authRoutes )

const PORT = 5000;
const server = app.listen(PORT , () => {
    console.log(`Server running on PORT ${PORT}`);  
})