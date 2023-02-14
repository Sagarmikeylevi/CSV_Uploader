const express = require('express');
const app = express();
const Port = 3000;

app.use(
    express.urlencoded({ extended: true })
);

app.use(express.static('assets')); 

// app.use('/' , require('./routes'));

app.listen(Port , (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`The server is running on PORT ${Port}`);
});
