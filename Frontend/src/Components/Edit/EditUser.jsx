import React, { useEffect, useState } from 'react'
// import './Edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import { loaduser,useredited } from '../../Api/Adminapi'

const EditUser = () => {
 
    const id =useParams()
    let [loaddata,setLoaddata]=useState({})
    let [err,setErr]=useState('')
    let navigate =useNavigate()

    useEffect(()=>{
      const userdetails =async()=>{
        loaduser(id.id).then((res)=>{
            const data ={
                name:res.userData.name,
                email:res.userData.email,
                phone:res.userData.phone
            }
            setLoaddata(data)
        }).catch((error)=>{
            console.log(error.message);
        })
      }
      userdetails()
    },[])

	let emailpattern= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const handlesubmit =(e)=>{
        e.preventDefault();
        if(loaddata.name.trim().length<4){
           return setErr("Name should contain atleast 4 characters");
        }else if(loaddata.phone.length<10 || loaddata.phone.length>10 ){
            return setErr("Phone number should contain 10 digits")
        }else if(!emailpattern.test(loaddata.email)){
            return setErr("Invalid email format")
        }
        useredited(loaddata).then((res)=>{
        navigate('/profile');
        }).catch((error)=>{
            console.log(error.message);
        })
    }
  return (
    <div>
            <div className="edit-container">
              {console.log(loaddata)}
    <div className="main-body">
        <div className="row">
            <div className="col-lg-8">
                <div className=" profile-card2">
                    <form  className="card-body" onSubmit={handlesubmit}>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control col-input" value={loaddata.name} onChange={(e)=>setLoaddata({...loaddata, name:e.target.value})}   />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary col-input">
                                <input type="text" className="form-control col-input" value={loaddata.email} onChange={(e)=>setLoaddata({...loaddata,email:e.target.value})} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Phone</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="number" className="form-control col-input"  value={loaddata.phone}  onChange={(e)=>setLoaddata({...loaddata,phone:e.target.value})} />
                            </div>
                        </div>
                        {err && <span style={{color:"red",justifyContent:"center",alignItems:"center", display:"flex"}}>{err}</span>}
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 text-secondary">
                                <input type="submit" className="btn btn-primary px-4" value={"save change"} />
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

export default EditUser