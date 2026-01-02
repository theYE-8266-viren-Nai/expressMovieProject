import express from 'express';

const router = express.Router()

router.get("/" , (req,res)=>{
    res.json("hello from the router")
})

export default router