const multer = require('multer');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const csvFiles = [];

// Create a disk storage engine for Multer
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', '/uploads'));
  },
  // Generate a unique filename for uploaded files
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});

// Filter out non-CSV files
function fileFilter(req, file, cb) {
  if (file.mimetype == 'text/csv') {
    cb(null, true);
  }
  else {
    console.log("Only CSV file is allowed");
    cb(null, false);
  }
}

// Create a Multer instance with the disk storage engine and file filter
const csvupload = multer({ storage: storage, fileFilter: fileFilter }).single('csv_file');

// Handle the file upload and add the uploaded file's name to csvFiles array
module.exports.upload = (req, res) => {
  csvupload(req, res, function (err) {
    if (err) {
      console.log("****Multer error", err);
      return;
    }
    else if (req.file) {
      csvFiles.push(req.file.filename);
    }
    return res.redirect('back');
  });
}

module.exports.uploadedcsvNames = ()=>{
  return csvFiles;
}

// Get the parsed data of a CSV file with a given index in csvFiles array
module.exports.open = (req , res) =>{
  const csvParsedData = [];             
  const index = req.params.index;
  fs.createReadStream(path.join(__dirname,'../','/uploads',csvFiles[index])) 
  .pipe(csv())
  .on('data', (data) => csvParsedData.push(data))
  .on('end', () => {
    return res.render('csvFile',{
      title: "CSVFILE | CSV UPLOADER",
      csvData: csvParsedData
    });
  });
}

// Delete a CSV file with a given index in csvFiles array
module.exports.delete = function(req,res){
  let index = req.params.index;
  try { var files = fs.readdirSync(path.join(__dirname,'..','/uploads')); }
    catch(e) { return; }
    if (files.length > 0){
        var filePath = path.join(__dirname,'..','/uploads',csvFiles[index]);
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
    }
    csvFiles.splice(index,1);
    return res.redirect('back');
}
