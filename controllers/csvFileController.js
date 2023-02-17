const multer = require('multer');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const csvFiles = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', '/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});

function fileFilter(req, file, cb) {

  if (file.mimetype == 'text/csv') {
    cb(null, true);
  }
  else {
    console.log("Only CSV file is allowed");
    cb(null, false);
  }
}

const csvupload = multer({ storage: storage, fileFilter: fileFilter }).single('csv_file');

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


module.exports.open = (req , res) =>{
  const csvParsedData = [];             
  const index = req.params.index;
  // console.log(csvFiles[index])
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
