const express = require('express');
const router = express.Router();

const csvFileController = require('../controllers/csvFileController');

router.post('/upload' , csvFileController.upload);
router.get('/open/:index', csvFileController.open);  
router.get('/delete/:index',csvFileController.delete); 

module.exports = router;