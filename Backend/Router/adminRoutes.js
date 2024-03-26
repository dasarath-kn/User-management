import  express  from "express";
import { login,listUsers,editUsers,deleteUser,loadUser,edituserdata,searchdata } from "../Controller/adminController.js";
 const admin_Router =express.Router()

 admin_Router.post('/login',login)
 admin_Router.get('/list',listUsers)
 admin_Router.get('/edit',editUsers)
 admin_Router.delete('/delete/:userId',deleteUser)
 admin_Router.get('/loaduser/:id',loadUser)
 admin_Router.post('/edituserdata',edituserdata)
 admin_Router.post('/searchdata',searchdata)
 

 export default admin_Router