import {configureStore} from '@reduxjs/toolkit'
import Userslice from './Slices/Userslice'

const Store = configureStore({
    reducer:{
        user:Userslice
    }
})

export default Store