import {configureStore} from '@reduxjs/toolkit'
import UserSlice from '../Store/Slices/Userslice'

const Store = configureStore({
    reducer:{
        user:UserSlice
    }
})

export default Store