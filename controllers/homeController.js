const csvFileController = require('./csvFileController');

const uploadedcsvFileNames = csvFileController.uploadedcsvNames;
const filesNames = uploadedcsvFileNames(); 

module.exports.home = (req , res) =>{
    return res.render('home' , {
        title: "HOME | CSV UPLOADER",
        filenames: filesNames
    });
}