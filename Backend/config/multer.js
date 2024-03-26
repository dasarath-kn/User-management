import multer from "multer";
import path from'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
    destination:function(req,file,callbacks){
        callbacks(null,path.join( './public/users'))
    },
    filename:function(req,file,callbacks){
        const  name = Date.now()+"-"+file.originalname;
        callbacks(null,name)
    }
})

 export const upload = multer({storage:storage})




