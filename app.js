const express = require('express');
const path = require('path');
const fs = require('fs')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { start } = require('repl');

const app = express();
const PORT = 2000;

// connection database

var alertmsg = '';

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



var globalvolid = 0;
app.get('/reserv/:volId',(req, res) =>{
    // const { theId} = req.body.idya;
    const volId = req.params.volId;
    globalvolid = volId;
    alertmsg = '';
    var nombre_places_rest = 0;
    res.render('reservation',{
        id: volId,
        alertmsg,
        nombre_places_rest
    });
});


// ------

// ------


app.post('/savereservation',(req,res) => {

    //start
    // app.get('/edit/:userId',(req, res) =>{
        // const id_vol1 = req.body.id_vol;
        const nombre_places_selected = req.body.nombre_places1;
        let sql4 = `SELECT * FROM vols WHERE id = `+globalvolid;
        let query = conn.query(sql4, (err, firstresult) =>{
            if(err) throw err;
            else{
                var achkayen = '3lalah';
                var nbrpls = firstresult[0];
                var nombre_places_rest = nbrpls.nombre_places;
                // var hid = '';
                
                if(nombre_places_selected <=nombre_places_rest){
                    alertmsg = 'Succes';
                    achkayen = 'rak nadi';
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
                                    // let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-1 WHERE `id`="+id_vol;
                                    let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-"+nombre_places_selected+" WHERE `id`="+globalvolid;
                                    let query3 = conn.query(sql3,(err, results) =>{
                                        if(err) throw err;
                                        // res.redirect('/');
                                        // start
                                        res.render('confirmation',{
                                            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                                            volid : firstresult[0],
                                            nombre_places_rest : nombre_places_rest - nombre_places_selected,
                                            nombre_places_selected,
                                            achkayen,
                                            allertt : ('<h1>Hello Express!</h1>'),
                                            alertmsg
                                        });
                                        // end
                                    });
                                }
                            });
                            
                        }
                        // res.redirect('/');
                    });
                }else{
                    achkayen = '9awedtiha';
                    alertmsg = '';
                    res.render('confirmation',{
                        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                        volid : firstresult[0],
                        nombre_places_rest,
                        nombre_places_selected,
                        achkayen,
                        allertt : ('<h1>Hello Express!</h1>'),
                        alertmsg
                    });
                    // res.redirect('/reserv/'+globalvolid);
                }
            }
            
        });
    // });
    //end






})
//end test
    
// -------AFFICHE USER-----------// 


app.listen(PORT, () =>{
    console.log('sever Connected !');
})