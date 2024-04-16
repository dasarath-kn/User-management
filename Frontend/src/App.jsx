import Home from './Components/homepage/homepage'
import Login from './Components/Loginpage/Login'
import Signup from './Components/Signuppage/Signup'
import Profile from './Components/Profilepage/Profile'
import AdminLogin from './Components/Admin/Loginpage/Login'
import AdminHome from './Components/Admin/Homepage/Home'
import Edit from './Components/Admin/Edit/Edit'
import Adduser from './Components/Admin/Add/Adduser'
import EditUser from './Components/Edit/EditUser'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserLoginAuth from './Authentication/UserLoginAuth'
import UserLogoutAuth from './Authentication/UserLogoutAuth'
import AdminLoginAuth from './Authentication/AdminLoginAuth'
import AdminLogoutAuth from './Authentication/AdminLogoutAuth'

import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        
    <Route path='/*' element={ <UserLoginAuth><Home /></UserLoginAuth>} />
    <Route path='/login' element={ <UserLogoutAuth><Login/></UserLogoutAuth>} />
    <Route path='/signup' element={<UserLogoutAuth><Signup /></UserLogoutAuth>} />
    <Route path='/profile' element={<UserLoginAuth><Profile/></UserLoginAuth>} />
    <Route path='/admin' element={<AdminLogoutAuth><AdminLogin/></AdminLogoutAuth>} />
    <Route path='/admin/home' element={<AdminLoginAuth><AdminHome/></AdminLoginAuth>} />
    <Route path='/admin/edit/:id' element={<AdminLoginAuth><Edit/></AdminLoginAuth>} />
    <Route path='/admin/adduser' element={<AdminLoginAuth><Adduser/></AdminLoginAuth>} />

      </Routes>
    </Router>
    </>
  )
}

export default App
