const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
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
    },
    quantity:{
        type:Number,
        require:true
    },
    eventId:{
        type:String,
        require:true
    },
    grandtotal:{
        type:Number,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    }
})

const bookings=mongoose.model('bookings',bookingSchema)

module.exports=bookings