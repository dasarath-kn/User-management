import User from '../Models/userModels.js'
import  jwt  from 'jsonwebtoken';
export const login =async(req,res)=>{
    try {
        let userdetails = await User.findOne({email:req.body.email})
        console.log(userdetails);
       if(userdetails){
        if(userdetails.password ==req.body.password){
           const secretKey = userdetails._id.toString();
         const token = jwt.sign({userId:userdetails._id},secretKey,{expiresIn:'30d'})
         res.json({token,userdetails,status:true})
       }else{
        res.json({status:false,error:"User not found"})
       }}
       else{
        res.json({status:false,error:"User not found"})

       }
        
    } catch (error) {
        
    }
}

export const signup =async(req,res)=>{
try {
    const userdata = new User({
        name:req.body.name,
        email:req.body.email,
        phone:Number(req.body.phone),
        password:req.body.password,
        isAdmin:false
    })
    let existingdata = await User.findOne({email:req.body.email})
    if(existingdata){
        console.log("already exist");
        res.json({status:false,error:"User already exist"})
    }else{
        if(req.body.password == req.body.confirmPassword){
        let data = await userdata.save()
        if(data){
            const secretKey = data._id.toString();

         const token = jwt.sign({userId:data._id},secretKey,{expiresIn:'30d'})

         res.json({token,userdata,status:true})
        }}else{
            res.json({error:"Password not match"})
        }
    }
} catch (error) {
    console.log(error.message);
}
}

export const imageupload =async(req,res)=>{
try {
    const id = req.body.id
     const upload = await User.updateOne({_id:id},{$set:{image:req.file.filename}})
    const userData = await User.findOne({_id:id})
     res.json({status:true, userData})
} catch (error) {
    console.log(error.message);
}
}