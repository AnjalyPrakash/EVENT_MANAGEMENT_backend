//import dotenv
require('dotenv').config()//load .env file contents into process.env

//import express
const express =require('express')

//import cors
const cors=require('cors')

//import router
const router =require('./Router/router')

//import connections
require('./DB/connections')

//create server
const bbserver=express()//method to create server

//use cors in server
bbserver.use(cors()) // to connect frontend and backend

//from frntend to backend data format is json so to convert it to js
bbserver.use(express.json())

//use router
bbserver.use(router)

bbserver.use('/uploads',express.static('./Uploads'))

//create port
const PORT=4000 || process.env

//run server
bbserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESFULLY AT PORT NUMBER ${PORT}`);
})

bbserver.get('/',(req,res)=>{
    res.send('BEAT BURST')
})