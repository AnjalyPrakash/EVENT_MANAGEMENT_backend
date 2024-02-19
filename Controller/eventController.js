const events=require('../Model/eventSchema')

exports.addevents=async(req,res)=>{
        const image = req.file.filename
        const {title,location,locationUrl,date,time,amount}=req.body
        console.log(req.body);
        try {
            const existEvent=await events.findOne({title})
            if(existEvent){
                res.status(406).json('Event Already Exists...Please Upload a New Event..!!')  
            }
            else{
                const newEvent = new events({
                    image,
                    title,
                    location,
                    locationUrl,
                    date,
                    time,
                    amount
                })
                await newEvent.save()
                res.status(200).json(newEvent)
            }
        } catch (error) {
            res.status(401).json(`Request Failed due to ${error}`)
        }
    console.log('inside eventcontroller - add event Function');
}

exports.getevents=async(req,res)=>{
    try{const allevents=await events.find()
    res.status(200).json(allevents)}
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

exports.deleteevent=async(req,res)=>{
    const {id}=req.params
    try {
      const removeeveent=await events.findByIdAndDelete({_id:id})
      res.status(200).json(removeeveent)
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.getuserhomeevent=async(req,res)=>{
    const search=req.query.search
    const query={
        title:{
            //i remove casesentivity
            $regex:search,$options:'i'
        }
    }
    try{
        const homeevents=await events.find(query)
        res.status(200).json(homeevents)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

exports.editevent=async(req,res)=>{
    const {id}=req.params
    const {title,location,locationUrl,date,time,amount,image}=req.body 
    const uploadedeventImage=req.file?req.file.filename:image

    try {
        const editEvent=await events.findByIdAndUpdate({_id:id},{title,location,locationUrl,date,time,amount},{image:uploadedeventImage},{new:true})//1st one mongodb 2nd destructured

        await editEvent.save()
        res.status(200).json(editEvent)

    } catch (error) {
        res.status(401).json(error)
    }
}

