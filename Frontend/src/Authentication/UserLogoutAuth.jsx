import React from 'react'
import {Navigate} from 'react-router-dom'

const UserLogoutAuth = ({children}) => {
  const hasToken = Boolean(localStorage.getItem('token'))
    return hasToken? <Navigate to ='/'/> : children
}

export default UserLogoutAuth