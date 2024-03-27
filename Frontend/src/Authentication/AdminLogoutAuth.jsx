import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminLogoutAuth({children}) {
  const hasToken = Boolean(localStorage.getItem('Admintoken'));
  
  return hasToken ? <Navigate to="/admin/home" /> : children  ;
}

export default AdminLogoutAuth