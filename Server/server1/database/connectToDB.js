const mongoose=require("mongoose");
const dotenv=require("dotenv");

// Accesing the DB_URL from .env file
if(process.env.NODE_ENV != 'production'){
    dotenv.config({path:"../../config.env"})
};

const connectToDB= async()=>{
    try{
        mongoose.set("strictQuery",true);
        await mongoose.connect(process.env.DB_URL,({useNewUrlParser:true}));
        console.log(`Connected to MongoDB`);
    }
    catch(err){
        console.log(`Error found :${err.message}`)
    }
}

module.exports=connectToDB















// const mongoose=require("mongoose");
// const dotenv=require("dotenv")


// // accessing the db
// if(process.env.NODE_ENV != 'production'){
// dotenv.config({path:"../../config.env"})
// }



// // connecting to db
// const connectToDB=async()=>{
//     try{
//         mongoose.set('strictQuery',true);
//         await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
//         console.log(`Connected to MongoDB`)
//     }
//     catch(err){
//         console.log(`Error found:${err.message}`)
//         process.exit(1)
//     }

// }


// module.exports=connectToDB;