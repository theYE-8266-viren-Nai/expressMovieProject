import {prisma} from "../config/db.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async(req,res)=> {
    const {name ,email, password} = req.body;
    
    //to check if the user exists
    const userExists = await prisma.user.findUnique({
        where : {email : email}
    });

    if(userExists) {
        return res.status(400).json({error : "User already exist with this email"})
    }

    //Hash Pasword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    //createUser
    const user = await prisma.user.create({
        data : {
            name ,
            email , 
            password : hashedPassword
        }
    })
    //generate JWT token 
    const token = generateToken(user.id);

    res.status(201).json({
        status : "success" , 
        data : {
            user : {
                id : user.id , 
                name : name
            } ,
        token
        }
    })
} 
const login  = async (req,res)=> {
    const {email, password} = req.body;

     //to check if the user email exists
    const user = await prisma.user.findUnique({
        where : {email : email}
    });

    if(!user) {
        return res.status(401).json({error : "Invalid email or password  "})
    }
    //verify password 
    const isPasswordValid = await bcrypt.compare(password , user.password);
      if(!isPasswordValid) {
        return res.status(401).json({error : "Invalid email or password  "})
    }
//generate JWT token 
    const token = generateToken(user.id);

    res.status(201).json({
        status : "success" , 
        data : {
            user : {
                id : user.id 
            } , 
            token ,
        }
    })
}
export {register , login}