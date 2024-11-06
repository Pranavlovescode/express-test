const express = require('express')
const router = express.Router()

// Route to get user profile
router.get('/',(req,res)=>{
    res.send("Profile Route")    
})

// Route to get user profile with id(using params)
router.get('/:id/:name',(req,res)=>{
    res.send(`Profile route with id = ${req.params.id} and name = ${req.params.name}`)
})

// Route to get user profile with id(using query)
router.get('/query',(req,res)=>{
    res.send(`Profile route with id = ${req.query.id} and name = ${req.query.name}`)
})

module.exports = router