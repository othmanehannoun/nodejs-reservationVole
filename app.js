const express = require('express');
const path = require('path');
// const fs = require('fs')
const bodyParser = require('body-parser');
const ejs = require('ejs');

const  nodemailer = require('nodemailer');



const app = express();
const PORT = 2000;



// set view file
app.set('views', path.join(__dirname, 'view'));
// set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> {
 
        res.render('Home');
  
});

// Routes
app.use(require('./routes/search'));
app.use(require('./routes/reservation'));
app.use(require('./routes/sendMail'));
app.use(require('./routes/succeeded'));

app.get('*', function(req, res){
    // res.status(404).send('what???');
    res.render('error');
});








// -------AFFICHE USER-----------// 


app.listen(PORT, () =>{
    console.log('sever Connected !');
})