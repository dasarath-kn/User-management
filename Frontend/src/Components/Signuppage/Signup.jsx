import React, { useState } from 'react'
import '../Signuppage/Signup.css'
import '../Signuppage/Signup.css'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../Api/Userapi'
const Signup = () => {
    let navigate =useNavigate()
	let [name,setName]=useState('')
	let [email,setEmail]=useState('')
	let [phone,setPhone]=useState('')
	let [password,setPassword]=useState('')
	let [confirmPassword,setConfirmPassword]=useState('')
	let [err,setErr]=useState('')
	let emailpattern= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	let handlesubmit =async(e)=>{
		
		e.preventDefault()
		try {
			if(name.length<4){
				return setErr("Name should contain atleast 4 characters")
			}else if(!emailpattern.test(email)){
				return setErr("Invalid email format");
			}
			else if(phone.length<10 || phone.length>10){
				return setErr("Phone number should contain 10 digits")
			}else if(password.length<6){
				return setErr("Password should contain atleast 6 characters")
			}
			const data = await signup({
				name,email,phone,password,confirmPassword
			})
			if(data.status){
				navigate('/')
			}else{
				setErr(data.error)
			}
			
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
					<input type="text" className="login__input" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="number" className="login__input" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Reset Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
				</div>
				{
					err && <span style={{color:'red'}}>{err}</span>
				}
				<button className="button login__submit" type='submit'>
					<span className="button__text">Sign Up</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
				<p style={{textAlign:'center', cursor:'pointer', color:'black'}} onClick={()=>navigate('/login')}>Already have an account already</p>
			</form>
			
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </div>
  )
}

export default Signup