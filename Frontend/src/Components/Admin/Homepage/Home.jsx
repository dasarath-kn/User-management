import React, { useEffect, useState } from 'react'
import './Home.css'
import {listusers,deleteUser,searchUser} from '../../../Api/Adminapi'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  let navigate =useNavigate()
  let[users,setUsers]=useState([]);
  let [search,setSearch]=useState('')
  let [searchuser,setSearchuser]=useState([])
  useEffect(()=>{
    listusers().then((res)=>{
      console.log(res.userdata);
      setUsers(res.userdata)
      setSearchuser(res.userdata)
    })
   
  },[])

  const deleteId =async(userId)=>{
    try {
      console.log(userId);
      deleteUser(userId).then((res)=>{
        const userdata = users.filter((user)=>user._id !=userId)
        setUsers(userdata)
        setSearchuser(userdata)
      })
      
    } catch (error) {
      console.log(error.message);
    }
  }
 const logout =()=>{
  localStorage.removeItem('Admintoken')
  navigate('/admin')

 }
  const searchUser =(e)=>{
    let data =e.target.value
    setSearch(data)
    if(data.trim()){
      const regexPattern = new RegExp(`^${data}`,'i')
      let searchdata = searchuser.filter((val)=>regexPattern.test(val.name))
      setSearchuser(searchdata)
    }else{
      setSearchuser(users)
    }
  }


  return (
    

<div className="container-xl">
    <div className="table-responsive">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-5">
                        <h2>User <b>Management</b></h2>
                    </div>
                    <div className="col-sm-7">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={searchUser}
                       
                    />
                  <button onClick={()=> navigate('/admin/adduser')} className='add-button'>Add User</button>
                  <button onClick={logout} className='add-button'>Logout</button>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>						
                        <th>Email</th>
                        <th>Phone</th>
                        <th>id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchuser.map((user,ind)=>{
                            return(
                                <tr key={user._id}>
                                    <td>{ind+1}</td>
                                    <td> {user.name}</td>
                                    <td>{user.email}</td>                        
                                    <td>{user.phone || 'Not added '}</td>
                                    <td><span className="status text-success">&bull;</span> {user._id}</td>
                                    <td>
                                        <a  onClick={()=>navigate(`/admin/edit/${user._id}`)} className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                                        <a  onClick={()=>deleteId(user._id)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
</div>     
  )
}

export default Home