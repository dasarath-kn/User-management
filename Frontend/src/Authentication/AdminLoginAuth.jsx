import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminLoginAuth({children}) {
 
    const hasToken = Boolean(localStorage.getItem('Admintoken'));
  
    return hasToken ? children : <Navigate to="/admin" />;

}

export default AdminLoginAuth