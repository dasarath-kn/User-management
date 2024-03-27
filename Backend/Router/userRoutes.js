import express from 'express'
import {login,signup,imageupload} from '../Controller/userController.js'
const user_Router =express.Router()
import {upload} from '../config/multer.js'
user_Router.post('/login',login)
user_Router.post('/signup',signup)
user_Router.post('/imageupload',upload.single('image'),imageupload)


export default user_Router