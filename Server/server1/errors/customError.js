// creating a new custom error class


class CustomAPIError extends Error{
    constructor(message,statusCode){//constructor is the special method we invokes when we create a new instance of a class 
        super(message)
        this.statusCode=statusCode
    }
};

const createCustomError=(msg,statusCode)=>{
    return new CustomAPIError(msg,statusCode)
};

module.exports={CustomAPIError, createCustomError};

