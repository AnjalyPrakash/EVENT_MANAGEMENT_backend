//import express
const express = require('express')

//import userController
const userController=require('../Controller/userController')

//import eventController
const eventController=require('../Controller/eventController')

//import booking Controller
const bookingController=require('../Controller/bookingController')

//import multer
const multerConfig=require('../Middleware/multerMiddleware')

//jwtmiddleware
const jwtmiddleware=require('../Middleware/jwtMiddleware')

//create object for router class in express module
const router=new express.Router()

//setup path to resolve request
//syntax:- router.httprequest('path to resolve',()=>{how to resolve})
//a)register
router.post('/user/register',userController.register)

//b)login
router.post('/user/login',userController.login)

//c)add events
router.post('/events/add',multerConfig.single("image"),eventController.addevents)

//d)get events
router.get('/events',eventController.getevents)

//e)delete event
router.delete('/event/remove/:id',eventController.deleteevent)

//f)edit user
router.put('/user/edit',jwtmiddleware,multerConfig.single('profile'),userController.editprofile)

//g)get userhome events
router.get('/view-events',eventController.getuserhomeevent)

//h)event book
router.post('/event-booking/:eventId',jwtmiddleware,bookingController.booking)

//h)edit event
router.put('/event/edit/:id',multerConfig.single("image"),eventController.editevent)

//i)user details
router.get('/user-profile',jwtmiddleware,userController.userdetails)


//j)book event
router.post('/book',jwtmiddleware,bookingController.booking)

//k)view user booking
router.get('/view-bookings',jwtmiddleware,bookingController.getuserevents)

//l)get admin booking
router.get('/view-userBookings',jwtmiddleware,bookingController.admingetbookings)

//m) delte admin booking
router.delete('/book/delete/:id',jwtmiddleware,bookingController.deleteadminevent)

//export router
module.exports = router