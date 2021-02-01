const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const conn = require('../db/connection.js');

router.get('/succeeded/:userId/:idVol/:nbrplace/:idReservation',(req, res) => {
    const userId = req.params.userId;
    const idVol = req.params.idVol;
    const nbrplace = req.params.nbrplace;
    const idReservation = req.params.idReservation;
    let sql = `Select * from users where id = ${userId}`;
    let query = conn.query(sql,(err, result) => {
        if(err) throw err;
        res.render('succeeded', {
            title: 'succeeded',
            nom : result[0]['nom'],
            prenom: result[0]['prenom'],
            email: result[0]['email'],
            telephone: result[0]['telephone'],
            nombreP : nbrplace,
            idReservation : idReservation
        })
        });

});


module.exports = router;