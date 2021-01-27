const express = require('express');
const path = require('path');
const fs = require('fs')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = 2000;

// connection database

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "res-vols"
});

conn.connect(function(error){
    if(error) console.log(error);
    else console.log('Database Connected')
});


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
    
// -------AFFICHE USER-----------// 


app.listen(PORT, () =>{
    console.log('sever Connected !');
})