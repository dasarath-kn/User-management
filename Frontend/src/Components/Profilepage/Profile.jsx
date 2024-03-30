import React, {  useState } from 'react'
import '../Profilepage/Profile.css'
import {uploadpicture} from '../../Api/Userapi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../Store/Slices/Userslice'
import { useNavigate } from 'react-router-dom'
import { logoutDetails } from '../../Store/Slices/Userslice';

const Profile = () => {
  const Navigate =useNavigate()
  const dispatch =useDispatch()
  let [status,setStatus]=useState(true)

  let userdata =useSelector((state)=>state.user)
  let [name,setName]=useState(userdata.name)
  let [email,setEmail]=useState(userdata.email)
  let [phone,setPhone]=useState(userdata.phone)
  let [err,setErr]=useState('')
  const logout =()=>{
    localStorage.removeItem('token')
    dispatch(
      logoutDetails()
    )
  Navigate('/login')
  }
  const intialstate ={
    id:userdata.id || '',
    name:userdata.name || '',
    email:userdata.email || '',
    phone:userdata.phone || '',
    image :userdata.image || ''
  }
  const [data,setData]=useState(intialstate)
  console.log(data,"state data...");
  const upload = async()=>{
    let datas ={
      image:data.image,
      id:data.id
    }

  
    const response = await uploadpicture(datas)
    dispatch(
      setUserDetails({
        id: response.userData._id,
        name: response.userData.name,
        email: response.userData.email,
        image: response.userData.image,
        phone: response.userData.phone,
        isAdmin: response.userData.isAdmin,
      })
    );

    
  }
	let emailpattern= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const edited =(e)=>{
    e.preventDefault()
    if(status){
      setStatus(false)
    }else{
      setStatus(true)
      if(name.trim().length<4){
        return setErr("Name should contain atleast 4 characters");
     }else if(phone.length<10 || phone.length>10 ){
         return setErr("Phone number should contain 10 digits")
     }else if(!emailpattern.test(email)){
         return setErr("Invalid email format")
     }
      dispatch(setUserDetails({
        id:userdata.id,
        name:name,
        email:email,
        image:userdata.image,
        phone:phone,
        isAdmin:userdata.isAdmin
      }))
    }
  }
  return (
    <div className='div2'>
  <div className="container">
    <div className="main-body">
    
       
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={userdata.image ? ` http://10.4.5.206:7070/${userdata.image}`: "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{userdata.name}</h4>
                      <  input type="file" onChange={(e)=>setData({...data,image:e.target.files[0]})} />
                      
                      
                      <button className="btn btn-primary" onClick={upload}>Upload</button>
                      <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            

            
            <div className="col-md-8">
              <div className="card mb-3">
               { status?
               <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userdata.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userdata.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userdata.phone}
                    </div>
                  </div>
                  <hr/>
                  
                 
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " onClick={()=>setStatus(false)} >Edit</a>
                    </div>
                  </div>
                </div>:   <div>
            <div className="edit-container">
             
    <div className="main-body">
        <div className="row">
            <div className="col-lg-8">
                <div className=" profile-card2">
                    <form  className="card-body" onSubmit={(e)=>edited(e)} >
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control col-input" value={name} onChange={(e)=>setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary col-input">
                                <input type="text" className="form-control col-input" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Phone</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="number" className="form-control col-input" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                            </div>
                        </div>
                        {err && <span style={{color:"red",justifyContent:"center",alignItems:"center", display:"flex"}}>{err}</span>}
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 text-secondary" >
                                  <button type='submit' className="btn btn-primary px-4">save change</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>}
              </div>

           


            </div>
          
          
          </div>

        </div>
    </div>
        
    </div>
  )
}

export default Profile