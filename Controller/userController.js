const users = require('../Model/userSchema')

const jwt =require('jsonwebtoken')

//logic to resolve the request

//register request
exports.register = async (req, res) => {
    //extract data from req body
    const { username, email, password } = req.body
   console.log(req.body);
    // checking whether this email password using anyone
    try {
        const existUser = await users.findOne({email})
        if (existUser) {
            res.status(406).json('Account Already Exist...Please Login!')
        }
        else {
            //create object
            const newUser = new users({
                username,
                email,
                password,
                profile: ""
            })
            //add to mongodb -- save()
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(`Register Failed due to ${err}`)
    }
}

//login request
exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
    if(existingUser){

        const token=jwt.sign({userId:existingUser._id},"beatburst7012")
        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(406).json('Invalid Email or Password')
    }
}
catch(err){
    res.status(401).json(err)
}
}

//edit profile
exports.editprofile=async(req,res)=>{
    const userId=req.payload
    const {username,email,password,profile}=req.body
    const profileImg=req.file?req.file.filename:profile

    try {
        const updateUser=await users.findByIdAndUpdate({_id:userId},{username,email,password,profile:profileImg},{new:true})
        
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(401).json(error) 
   }
}

exports.userdetails=async(req,res)=>{
    const userId=req.payload
    try {
        const userDetails=await users.find({_id:userId})
        res.status(200).json(userDetails)
    } catch (error) {
        console.log(error);
    }
}