import React, { useState } from 'react'
import '../Loginpage/Login.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../../Api/Userapi'
import {useDispatch} from 'react-redux'
import { setUserDetails } from '../../Store/Slices/Userslice'


const Login = () => {
    let navigate =useNavigate()
	let [email,setEmail]=useState('')
	let [password,setPassword] =useState('')
	let [err,setErr]=useState('')
	const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const dispatch = useDispatch()

	let handlesubmit =async(e)=>{
		e.preventDefault()
		try {
			if(!emailPattern.test(email)){
				return  setErr("Invalid email format")
				}else if(password.length < 4){
				  return setErr("Password must contain 4 character")
				}
			const data ={email,password}
			login(data).then((res)=>{
				if(res.status){
					localStorage.setItem('token',res.token)
					dispatch(setUserDetails({
						id:res.userdetails._id,
						name:res.userdetails.name,
						email:res.userdetails.email,
						is_Admin:res.userdetails.is_Admin,
						image:res.userdetails.image,
						phone:res.userdetails.phone,
					}))
					navigate('/')
					
					
				}
				else{
					setErr(res.error)
				}
			})
			
		} catch (error) {
			console.log(error.message);
		}
	}
  return (
    <div>
      <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={handlesubmit} >
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="  Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				</div>
				{
					err&& <span style={{color:'red'}}>{err}</span>
				}
				<button className="button login__submit" type='submit'>
					<span className="button__text">Login </span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div>
				<p style={{cursor:'pointer'}} onClick={()=>navigate('/signup')}>Create new account</p>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </div>
  )
}

export default Login
