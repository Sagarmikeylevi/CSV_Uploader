const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Port = 3000;

app.use(
    express.urlencoded({ extended: true })
);

app.use(express.static('assets')); 

// express layouts
app.use(expressLayouts);

//set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views' , './views');

app.use('/' , require('./routes'));

app.listen(Port , (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`The server is running on PORT ${Port}`);
});
