// the asyncwrapper is being used to eliminate the try & catch used in all the controller


const asyncWrapper=(fn)=>{
    return async (req,res,next)=>{
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
};

module.exports=asyncWrapper;

