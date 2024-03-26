import mongoose from 'mongoose';
const url ='mongodb://0.0.0.0.:27017/Usermanagement';
const connected = async()=>{
    try {
       const connect = await mongoose.connect(url)
      if(connect){

          console.log("Database connected");
      }
    } catch (error) {

        console.log(error.message);
    }
}


export default connected
