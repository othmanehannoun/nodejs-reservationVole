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
    database: "res_vols"
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
    // res.render('Home');
    //START UPDATE
    // const { villdepart,villarrive} = req.body;
    let sql0 = `SELECT * FROM vols WHERE nombre_places > 0`;
    // console.log(sql);
    let query = conn.query(sql0, (err, results) =>{
        if(err) throw err;
        res.render('Home',{
            vols : results
        });
    });
    //end update
});


// start test
app.post('/search1/',(req, res) =>{
    // const userId = req.params.userId;
    const { villdepart,villarrive} = req.body;
    let sql = `SELECT * FROM vols WHERE ville_depart = '${villdepart}' AND ville_darrive = '${villarrive}' AND nombre_places > 0`;
    console.log(sql);
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.render('search',{
            vols : results
        });
    });
});

// app.get('/reservation/:volId',(req, res) =>{
//     const volId = req.params.volId;
//     console.log(volId);
//     // let sql = `SELECT * FROM users WHERE id = ${userId}`;
//     // let query = connection.query(sql, (err, result) =>{
//         if(err) throw err;
//         // res.render('user_edit',{
//         //     title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
//         //     user : result[0]
//         // });
//         res.render('reservation',{
//             title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
//             volId : volId
//         });
//     // });
// });

app.get('/reserv/:volId',(req, res) =>{
    // const { theId} = req.body.idya;
    const volId = req.params.volId;
    res.render('reservation',{
        id: volId
    });
});

// app.get('/reserv',(req, res) =>{
//     // const { volId} = req.body.idya;
//     // const volId = req.params.idya;
//     const { volId} = req.body;
//     alert("cc");
//     res.render('reservation',{
//         id: volId
//     });
// });

// app.get('/reserv',(req, res) =>{
//     // const { theId} = req.body.idya;
//     // const volId = req.params.volId;
//     console.log(idya)
//     res.render('reservation',{
//         // id: volId
//     });
// });



app.post('/savereservation',(req,res) => {
    let data = {nom:req.body.name,prenom:req.body.prenom, email:req.body.email, telephone:req.body.phone_no};
    let sql = "INSERT INTO users Set ?";
    let query = conn.query(sql, data,(err, results) =>{
        if(err) throw err;
        else{
            // console.log(results.insertId);
            // res.redirect('/');

            var datetime = new Date();
            let data2 = {id_user:results.insertId ,id_vol:req.body.id_vol , nombre_places:req.body.nombre_places,date_de_reservation:datetime};
            let sql2 = "INSERT INTO reservation Set ?";
            let query2 = conn.query(sql2, data2,(err, results) =>{
                if(err) throw err;
                // res.redirect('/');
                else{
                    // UPDATE `vols` SET `nombre_places`=`nombre_places`-1 WHERE `id`= 1
                    const id_vol = req.body.id_vol;
                    // let sql = "UPDATE `users` SET name='"+req.body.name+"',email='"+req.body.email+"',phone_no='"+req.body.phone_no+"' WHERE id ="+userId;
                    let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-1 WHERE `id`="+id_vol;
                    let query3 = conn.query(sql3,(err, results) =>{
                        if(err) throw err;
                        res.redirect('/');
                    });
                }
            });
            
        }
        // res.redirect('/');
    });
})
//end test
    
// -------AFFICHE USER-----------// 


app.listen(PORT, () =>{
    console.log('sever Connected !');
})