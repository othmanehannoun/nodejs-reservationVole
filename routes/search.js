const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const conn = require('../db/connection.js');


// recherch vols
router.post('/search1',(req, res) =>{
    // const userId = req.params.userId;
    const { villdepart,villarrive,dateDepart,heureDepart,heureRoteur,nombreplacesherch} = req.body;

    let sql = `SELECT * FROM vols WHERE nombre_places > 0 `;
    if(villdepart != ''){
        sql +=` AND ville_depart = '${villdepart}' `;
    }
    if(villarrive !=  ''){
        sql +=` AND ville_darrive = '${villarrive}' `;
    }
    if(dateDepart !=  ''){
        sql +=` AND date_depart = '${dateDepart}' `;
    }
    if(heureDepart !=  ''){
        sql +=` AND lheure_depart = '${heureDepart}' `;
    }
    if(heureRoteur !=  ''){
        sql +=` AND lheure__arrive = '${heureRoteur}' `;
    }
    if(nombreplacesherch !=  ''){
        sql +=` AND nombre_places + 1 > '${nombreplacesherch}' `;
    }

    console.log(sql);
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.render('search',{
            vols : results
        });
    });
});


module.exports = router;