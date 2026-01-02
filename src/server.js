import express from 'express'
import {config} from 'dotenv'
import {connectDB , disconnectDB } from './config/db.js'
//import Routes
import movieRoutes from './routes/movieRoutes.js'

config()
connectDB()
const app = express()

app.get("/hello" , (req,res)=>{
    res.json({message : "Hello World"})
})

app.use("/movies" , movieRoutes)

const PORT = 5000;
const server = app.listen(PORT , () => {
    console.log(`Server running on PORT ${PORT}`);  
})