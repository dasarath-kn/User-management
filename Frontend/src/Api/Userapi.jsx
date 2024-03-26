import axios from 'axios'
const userapi =axios.create({
    baseURL:'http://localhost:3000',withCredentials:true
})

 export const login =async(logindata)=>{
    try {
        
        console.log(logindata);
        const values = await userapi.post('/login',logindata)
        return values.data
    } catch (error) {
       console.log(error.message); 
    }
}

export const signup =async(signup)=>{
    try {
        const values = await userapi.post('/signup',signup)
        return values.data
        
    } catch (error) {
        console.log(error.message);
    }
}

export  const uploadpicture =async(data)=>{
    try {
        console.log(data.id);
        const formData = new FormData()
        formData.append("image",data.image)
        formData.append("id",data.id)
        const values = await userapi.post('/imageupload',formData)
        return values.data
    } catch (error) {
        
    }
}
