import React, { useState } from 'react'
import './Login.css'
import { login } from '../../../Api/Adminapi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  let [email,setEmail]=useState('');
  let [password,setPassword] =useState('');
  let [err,setErr]=useState('')
  const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit =async(e)=>{
    e.preventDefault()
   try {
    if(!emailPattern.test(email)){
      return  setErr("Invalid email format")
      }else if(password.length < 4){
        return setErr("Password must contain 4 character")}
      
     const values =  await login({email,password})
      if(values.status){
        if(values.status){
          localStorage.setItem('Admintoken',values.adminToken)
          navigate('/admin/home')
       

      }else{
         setErr(values.error)
      }
    }
   } catch (error) {
    console.log(error.message);
   }
  }
  return (
    <div className='div1'>
    <section class="container">
        <div class="login-container">
            <div class="circle circle-one"></div>
            <div class="form-container">
                <h1 class="opacity">LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    {
                      err&& <span style={{color:'red'}}>{err}</span>
                    }
                    <button class="opacity" type='submit'>SUBMIT</button>
                </form>
              
            </div>
            <div class="circle circle-two"></div>
        </div>
        <div class="theme-btn-container"></div>
    </section>

    </div>
  )
}

export default Login