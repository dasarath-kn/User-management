import express from 'express'
const app =express()
import userRoutes from './Router/userRoutes.js';
import adminRoutes from './Router/adminRoutes.js'
import dbConnect from './config/db.js'
import cors from 'cors'
import path from 'path'
const Port = 3000
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dbConnect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    cors({
        origin:['http://localhost:5173'],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true
    })
)
app.use(express.static(path.join(__dirname, "public")));
app.use('/',userRoutes)
app.use('/admin',adminRoutes)


app.listen(Port,()=>{console.log("Server running");})