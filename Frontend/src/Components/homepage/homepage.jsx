import React, { Fragment } from 'react'

import '../homepage/homepage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const homepage = () => {
  let navigate =useNavigate()
  const dispatch =useDispatch()
  const userdata =useSelector((state)=>state.user)
  const logout =()=>{
    localStorage.removeItem('token')
    navigate('/login')

  }
  return (
    <Fragment>
    <div className="bg">
    <h1>{userdata.name}</h1>
  </div>
  <div className="nft">
    <div className="main">
      {/* <img
        className="tokenImage"
         src={
          userData.image
            ? `/uploads/${userData.image}`
            : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
        }
        alt="NFT"
      /> */}
      <h2>{userdata.name}</h2>
      <p className="description">
      {userdata.email}
      </p>
      <div className="tokenInfo">
        <div  style={{cursor:'pointer'}} onClick={()=>navigate('/profile')}  className="price">
          <p>Profile</p>
        </div>
        {/* <div className="duration">
          <ins>◷</ins>
          <p>11 days left</p>
        </div> */}
      </div>
      <hr />
      <div className="creator">
        <div className="wrapper">
          {/* <img
           src={
            userData.image
              ? `/uploads/${userData.image}`
              : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
          }
            alt="Creator"
          /> */}
        </div>
        <p style={{cursor:'pointer'}}  onClick={logout}>
          <ins>click here to </ins> LogOut
        </p>
      </div>
    </div>
  </div>
  </Fragment>
  )
}

export default homepage