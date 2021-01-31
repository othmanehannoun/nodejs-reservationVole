const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const conn = require('../db/connection.js');

router.get('/savereservation', (req, res) => {
    
    res.render('reservation');
  }); 

var alertmsg = '';
var globalvolid = 0;
router.get('/reservation/:volId',(req, res) =>{
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


router.post('/savereservation',(req,res) => {

        const nombre_places_selected = req.body.nombre_places1;
        let sql4 = `SELECT * FROM vols WHERE id = `+globalvolid;
        let query = conn.query(sql4, (err, firstresult) =>{
            if(err) throw err;
            else{

                var nbrpls = firstresult[0];
                var nombre_places_rest = nbrpls.nombre_places;
                // var hid = '';
                var id_user = 0;
                
                if(nombre_places_selected <= nombre_places_rest){
                    alertmsg = 'Succes';

                    let data = {nom:req.body.name,prenom:req.body.prenom, email:req.body.email, telephone:req.body.phone_no};
                    let sql = "INSERT INTO users Set ?";
                    let query = conn.query(sql, data, (err, results) =>{
                        if(err) throw err;
                        else{
                      
                            var datetime = new Date();
                            var id_user = results.insertId;
                            let data2 = {id_user:results.insertId ,id_vol:req.body.id_vol , nombre_places:req.body.nombre_places,date_de_reservation:datetime};
                            let id
                            let sql2 = "INSERT INTO reservation Set ?";
                            let query2 = conn.query(sql2, data2,(err, resultsreservation) =>{
                                if(err) throw err;
                               
                                else{
                                
                                    idReservation =  resultsreservation.insertId
                                    const id_vol = req.body.id_vol;
                                    
                                    let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-"+nombre_places_selected+" WHERE `id`="+globalvolid;
                                    let query3 = conn.query(sql3,(err, results) =>{
                                        if(err) throw err;
                                       
                                        res.render('confirmation',{
                                            volid : firstresult[0],
                                            id_user,
                                            idReservation,
                                            nombre_places_rest : nombre_places_rest - nombre_places_selected,
                                            nombre_places_selected,
                                            // achkayen,
                                            // allertt : ('<h1>Hello Express!</h1>'),
                                            alertmsg,
                                            
                                        });
                                       
                                    });
                                }
                                
                            });
                            
                        }
                      
                    });
                }else{
                    achkayen = '9awedtiha';
                    alertmsg = '';
                    res.render('confirmation',{
                        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                        volid : firstresult[0],
                        id_user,
                        nombre_places_rest,
                        nombre_places_selected,
                        // achkayen,
                        // allertt : ('<h1>Hello Express!</h1>'),
                        alertmsg
                    });
                  
                } 

                
            }
            
        });
       
});




module.exports = router;