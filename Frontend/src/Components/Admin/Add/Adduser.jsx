import React, { useState } from 'react'
import {signup} from '../../../Api/Userapi'
import { useNavigate } from 'react-router-dom'
const Adduser = () => {
    let navigate = useNavigate()
    let [name,setName]=useState('')
    let [email,setEmail]=useState('')
    let [phone,setPhone]=useState('')
    let [password,setPassword]=useState('')
    let [confirmPassword,setConfirmPassword]=useState('')
    let [err,setErr]=useState('')
    let emailpattern= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let handleSubmit =(e)=>{
        e.preventDefault()
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
        let data={name,email,phone,password,confirmPassword}
        signup(data).then((res)=>{
            if(res.status){
                navigate('/admin/home')
            }else{
                setErr(res.error)
            }
        })
    }
  return (
    <div>
      <div className="edit-container">
    <div className="main-body">
        <div className="row">
            <div className="col-lg-8">
                <div className=" profile-card2">
                    <form  className="card-body" onSubmit={handleSubmit} >
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control col-input" value={name} onChange={(e)=>setName(e.target.value)}  />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary col-input">
                                <input type="text" className="form-control col-input" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Phone</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="number" className="form-control col-input" value={phone} onChange={(e)=>setPhone(e.target.value)}   />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Password</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control col-input" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0"> Confirm Password</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control col-input"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
                            </div>
                        </div>
                        {err && <span style={{color:"red",justifyContent:"center",alignItems:"center", display:"flex"}}>{err}</span>}
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 text-secondary">
                                <input type="submit" className="btn btn-primary px-4" value={"Add"} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Adduser