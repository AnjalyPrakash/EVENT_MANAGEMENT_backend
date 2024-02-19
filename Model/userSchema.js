const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true, 
        min:[3,`must be atleast 3 characters but got {value}`]  
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw Error ('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
    }
})

const users=mongoose.model('users',userSchema)


module.exports=users