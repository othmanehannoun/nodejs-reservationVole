const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const conn = require('../db/connection.js');


// recherch vols
router.post('/search1',(req, res) =>{
    // const userId = req.params.userId;
    const { villdepart, villarrive, date_vole, time_vole} = req.body;
    let sql = `SELECT * FROM vols WHERE ville_depart = '${villdepart}' AND ville_darrive = '${villarrive}' AND date_depart = '${date_vole}' AND lheure_depart = '${time_vole}' AND nombre_places > 0`;
    console.log(sql);
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.render('search',{
            vols : results
        });
    });
});


module.exports = router;