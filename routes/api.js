const express = require('express')
const router = express.Router()

// API routes
router.get('/',(req,res)=>{
    res.send("API Route using get request")    
})
router.post('/',(req,res)=>{
    res.send("Created a new resource")    
})
router.put('/',(req,res)=>{
    res.send("Updated the resource")    
})
router.delete('/',(req,res)=>{
    res.send("Deleted the resource")    
})
router.patch('/',(req,res)=>{
    res.send("Patched the resource")    
})

module.exports = router