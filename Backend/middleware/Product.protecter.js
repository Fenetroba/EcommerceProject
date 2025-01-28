import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UsersData from '../model/User.model.js';
dotenv.config()
export const ProtectedRoute =async (req,res,next)=>{
     try {
          const accessToken=req.cookies.access_Token;
          if(!accessToken){
               return res.status(400).json({Error:"the accessToken is not provide"})
          }
  try {
      
     const decode=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
     const User=await UsersData.findById(decode.userId).select("-password");

     if(!User){
          return res.status(401).json({error:"User not found"})
     }
     req.user=User
     next()
  } catch (error) {
         if(error.name === 'TokenExpiredError'){
          return res.status(400).json({error:"the token is expited"})
         }
         throw error;
     
  }

     } catch (error) {
          console.log("the error created on the PRODUCTROUTER",error.message)
          return res.status(500).json({Error:"the error created on the PRODUCTROUTER"})
     }
}
export const AdminRout =async(req,res,next)=>{

try {
     if(req.user && req.user.role==="admin"){
          next()
     }
     else{
          return res.status(403).json({Error:"access denied"})
     }
} catch (error) {
     console.log("the error created on the admin")
     res.status(500).json({Error:"server error on the ADMIN"})
     
}
}