const mongoose=require("mongoose");

// schema model

const noteSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,`Value Should be provided`], // to make it mandatory, in array, first one is value and second is the message to be displayed on error
        trim:true,
        maxlength:[20,`Value exceeds the limit`]
    },
    body:{
        type:String
    },
    email:{
        type:String,
        required:[true,'Value cannot be empty'],
        validate:{
            validator:function(v){
                return /^\w+([\-.]\w+)*@\w+([\-.]\w+)*(\.[a-z]{2,3})+(.[a-z]{2,3})?$/.test(v)
        }},
            message:props=>`${props.value} is not a valid email`
    },
    phoneNumber:{
        type:String,
        required:[true, `value cannot be empty`],
        validate:{
            validator:function(v){
                return /^\(?\d{3}\)?[-. ]?(\d{3})[-. ]?(\d{4})$/.test(v)
            },
            message:props=>`${props.value} is not valid , provide a valid phone number`
        }
    }
});


// compiling the schema to module
const noteModel= mongoose.model("noteModel", noteSchema);

module.exports=noteModel;
