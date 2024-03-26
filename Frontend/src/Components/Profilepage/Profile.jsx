import React, { useState } from 'react'
import '../Profilepage/Profile.css'
import {uploadpicture} from '../../Api/Userapi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../Store/Slices/Userslice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const Navigate =useNavigate()
  const dispatch =useDispatch()
  const userdata =useSelector((state)=>state.user)
  const logout =()=>{
    localStorage.removeItem('token')
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
  const upload =()=>{
    let datas ={
      image:data.image,
      id:data.id
    }
    uploadpicture(datas).then((res)=>{
      dispatch(
        setUserDetails({
          id: res.userData._id,
          name: res.userData.name,
          email: res.userData.email,
          image: res.userData.image,
          phone: res.userData.phone,
          isAdmin: res.userData.isAdmin,
        })
      );
    })
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
                    <img src={data.image?data.image: "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{data.name}</h4>
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
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.phone}
                    </div>
                  </div>
                  <hr/>
                  
                 
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " onClick={()=>Navigate('/edit')} >Edit</a>
                    </div>
                  </div>
                </div>
              </div>

           


            </div>
          </div>

        </div>
    </div>
        
    </div>
  )
}

export default Profile