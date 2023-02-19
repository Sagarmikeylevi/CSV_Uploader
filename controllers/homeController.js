const csvFileController = require('./csvFileController');

// Get the function to retrieve the names of uploaded CSV files from csvFileController
const uploadedcsvFileNames = csvFileController.uploadedcsvNames;
// Invoke the function to get the current names of uploaded CSV files
const filesNames = uploadedcsvFileNames();

// Render the home page with the current names of uploaded CSV files
module.exports.home = (req , res) =>{
    return res.render('home' , {
        title: "HOME | CSV UPLOADER",
        filenames: filesNames
    });
}
