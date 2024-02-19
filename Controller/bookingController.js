const bookings = require('../Model/bookingSchema')

// exports.booking = async (req, res) => {
//     const userId = req.payload
//     const { image, title, location, locationUrl, date, time, amount, quantity, eventId ,username} = req.body
//     try {
//         const event = await bookings.findOne({ _id: eventId, userId })
//         if (event) {
//             // event.quantity+=1
//             event.grandtotal = event.quantity * event.amount
//             await event.save()
//             res.status(200).json("booked")
//         }
//         else {
//             const newEvent = new bookings({
//                 image, title, location, locationUrl, date, time, amount, quantity, eventId, grandtotal: amount, userId,username
//             })
//             await newEvent.save()
//             res.status(200).json(newEvent)
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).json(error)
//     }
// }

exports.booking = async (req, res) => {
    const userId = req.payload;
    const { image, title, location, locationUrl, date, time, amount, quantity, eventId,username } = req.body;
    try {
           let event = await bookings.findOne({ eventId, userId });
            const newEvent = new bookings({
                image,
                title,
                location,
                locationUrl,
                date,
                time,
                amount,
                quantity,
                eventId,
                grandtotal: amount * quantity,
                userId,
                username
            });
            await newEvent.save();
            res.status(200).json(newEvent);
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.getuserevents = async (req, res) => {
    const userId = req.payload
    try {
        const booking = await bookings.find({ userId })
        res.status(200).json(booking)
    }
    catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

exports.admingetbookings = async (req, res) => {
    const search = req.query.search;
    const query = {
        title: {
            // I removed casesensitivity
            $regex: search, $options: 'i'
        }
    };
    try {
        // const userId = req.payload;
        const userbooking = await bookings.find(query);
        // const users = await users.find({ _id: userId });
        res.status(200).json(userbooking);
    } catch (error) {
        res.status(401).json(error); // Corrected syntax for error message
    }
};


exports.deleteadminevent=async(req,res)=>{
    const {id} =req.params
    try {
        const deletebooking=await bookings.findByIdAndDelete({_id:id})
        res.status(200).json(deletebooking)
    } catch (error) {
        res.status(401).json(error)
    }
}
