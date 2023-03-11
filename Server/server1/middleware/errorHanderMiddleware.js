// to handle the error
const {CustomAPIError}=require("../errors/customError");

const errorHandleMiddleware=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
    res.status(err.statusCode).json({message:err.message})
}
 
res.status(500).json({msg:`Something went wrong, please try again`})
};

module.exports=errorHandleMiddleware;