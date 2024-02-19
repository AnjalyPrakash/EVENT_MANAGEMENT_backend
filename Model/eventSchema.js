const mongoose=require('mongoose')

const eventSchema=new mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    locationUrl:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    }
})

const events=mongoose.model('events',eventSchema)

module.exports=events