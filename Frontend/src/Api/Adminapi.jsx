import axios from 'axios'
const adminapi =axios.create({
    baseURL:'http://localhost:3000',withCredentials:true
})


export const login =async(logindata)=>{
    try {
        const values = await adminapi.post('/admin/login',logindata)
        return values.data
    } catch (error) {
        console.log(error.message);
    }
}

export const listusers =async()=>{
    try {
    const listResponse = await adminapi.get('/admin/list')
    return listResponse.data
        
    } catch (error) {
        console.log(error.message);
    }
}


export const edit =async()=>{
    try {
        const editresponse = await adminapi.put('/admin/edit')
        return editresponse.data
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(userid)=>{
    try {
        const deleteresponse = await adminapi.delete(`/admin/delete/${userid}`)
        return deleteresponse.data
        
    } catch (error) {
        console.log(error.message);
    }
}

export const loaduser =async(id)=>{
    try {
        const loaddata = await adminapi.get(`/admin/loaduser/${id}`)
        return loaddata.data
    } catch (error) {
        console.log(error.message);
    }
}

export const useredited =async(data)=>{
    try {
        const editeddata = await adminapi.post('/admin/edituserdata',data)
        return editeddata.data
        
    } catch (error) {
        console.log(error.message);
    }
}
export const searchUser = async(data)=>{
 try {
    const searchdata = await adminapi.get(`/admin/searchdata${data}`)
    return searchdata.data
} catch (error) {
    console.log(error.message);
 }
}