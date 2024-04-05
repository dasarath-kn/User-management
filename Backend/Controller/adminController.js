import User from '../Models/userModels.js'
import  jwt  from 'jsonwebtoken';

export const login =async(req,res)=>{
    try {
        const userdata =await User.findOne({email:req.body.email})
        if(userdata.isAdmin){
            const secretKey = userdata._id.toString();

            const adminToken = jwt.sign({userId:userdata._id},secretKey,{expiresIn:'30d'})
            console.log(adminToken);
            if(userdata.password ==req.body.password){
                res.json({userdata,status:true,adminToken})
            }
        }else{
            res.json({status:false,error:"Invalid admin"})
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const listUsers =async(req,res)=>{
    try {
        const userdata = await User.find({isAdmin:false})
        if(userdata){
            res.json({userdata,status:true})
        }else{
            res.json({status:false,error:"No users found"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const editUsers = async(req,res)=>{
    try {

        const userdata = await User.updateOne()
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req,res)=>{
 try {
    const id =req.params.userId
    const userdata = await User.deleteOne({_id:id})
    const data =await User.find();
    if(userdata){
        res.json({status:true,data})
    }else{
        res.json({status:false,error:"user not found"})
    }
 } catch (error) {
    console.log(error.message);
 }
}

export const loadUser = async(req,res)=>{
    try {
        console.log(req.params.id);
        const userData =await User.findOne({_id:req.params.id})
        console.log(userData);
        if(userData){
            res.json({status:true,userData})
        }else{
            res.json({status:false,error:" User not found"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const edituserdata =async(req,res)=>{
try {
    console.log(req.body.email
        ,"sdfs");
    const userdata =await User.updateOne({email:req.body.email},{$set:{name:req.body.name,email:req.body.email,phone:req.body.phone}})
   console.log(userdata);
    if(userdata){
        res.json({status:true,userdata})
    }else{
        res.json({status:false,error:"User not found"})
    }
} catch (error) {
    console.log(error.message);
}
}

export const searchdata =async(req,res)=>{
    try {
        console.log(req.params);
        
    } catch (error) {
        console.log(error.message);
    }
}