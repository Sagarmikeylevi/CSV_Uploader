const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/' , (req , res)=>{
    res.redirect('/home');
})

router.get('/home' , homeController.home);

console.log("Routes are running fine");
module.exports = router;