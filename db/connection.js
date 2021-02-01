const mysql = require('mysql');


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "res_vols"
});

conn.connect(function(error){
    if(error) console.log(error);
    else console.log('Database Connected!!!!!!!!!!!')
});

module.exports = conn;