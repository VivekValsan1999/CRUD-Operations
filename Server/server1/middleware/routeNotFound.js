// to check with conditions where the given route is not appropriate

const routeNotFound=async(req,res)=>{
    res.status(404)
    .json({message:`Given route is not available`})
}

module.exports=routeNotFound