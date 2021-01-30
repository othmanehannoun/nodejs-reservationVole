const express = require('express');
const path = require('path');
const fs = require('fs')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { start } = require('repl');
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// connection database

var alertmsg = '';
var globalNom = '';
var globalPrenom = '';
var globalEmail = '';
var globalTelephone = '';
var globalNombrePlaceSelected = '';
var globalIdReservation = '';

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
    const { villdepart,villarrive,dateDepart} = req.body;
    let sql = `SELECT * FROM vols WHERE ville_depart = '${villdepart}' AND ville_darrive = '${villarrive}' AND date_depart = '${dateDepart}' AND nombre_places > 0`;
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
                    globalNom = req.body.name;
                    globalPrenom = req.body.prenom;
                    globalEmail = req.body.email;
                    globalTelephone = req.body.phone_no;
                    globalNombrePlaceSelected = req.body.nombre_places1;
                    let sql = "INSERT INTO users Set ?";
                    let query = conn.query(sql, data,(err, results) =>{
                        if(err) throw err;
                        else{
                            // console.log(results.insertId);
                            // res.redirect('/');

                            var datetime = new Date();
                            let data2 = {id_user:results.insertId ,id_vol:req.body.id_vol , nombre_places:req.body.nombre_places,date_de_reservation:datetime};
                            let sql2 = "INSERT INTO reservation Set ?";
                            let query2 = conn.query(sql2, data2,(err, resultsreservation) =>{
                                if(err) throw err;
                                // res.redirect('/');
                                else{
                                    globalIdReservation =  resultsreservation.insertId
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

//validation
app.get('/validation', (req, res)=> {
    
    //START SEND MAIL
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //   let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "tmail1058@gmail.com",
                pass: "test@2020",
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Crazy RH" <foo@example.com>', // sender address
            to: "wecesif399@lovomon.com", // list of receivers
            subject: "Hello 6", // Subject line
            // text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
            // html: `this is message`
            // html: `<h1>Valider</a><hr><a href='http://localhost:3000/reserv/1'>confermation</a>`
            html: ` 
                <section style='background-color: #F5F5F5;'>
                    <center>
                        <div class='container border border-warning rounded' style='background-color: white;max-width:660px'>
                            <!-- <center> -->
                                <div style='background-color: #f96b13;padding: 4px;'></div>
                                <div style='width: 100%;'>
                                    <div style='display: flex; width: 100%;margin-top: 20px;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Vol ID : `+globalvolid+`</h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>Reservation ID : `+globalIdReservation+`</h4>
                                    </div>
                                    <div style='display: flex; width: 100%;margin-top: 20px;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Nom : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalNom+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Prenom : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalPrenom+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Email : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalEmail+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Telephone : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalTelephone+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Nombre de places : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalNombrePlaceSelected +` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>

                                    <div style='width: 100%;'>
                                        <!-- <hr> -->
                                        <a href='http://localhost:3000/succeeded/`+globalvolid+`/`+globalIdReservation+`/`+globalNom+`/`+globalPrenom+`/`+globalEmail+`/`+globalTelephone+`/`+globalNombrePlaceSelected+`' style='background:#f96b13;border:1px solid #f96b13;text-decoration:none;padding:20px 30px;color:#ffffff;border-radius:4px;display:inline-block;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:20px'>Valider</a>
                                    </div>
                                    
                                </div>
                            <!-- </center> -->
                        </div>
                    </center>
                </section>`
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  
    main().catch(console.error);
    //END SEND MAIL
        
    res.render('validation');

});

    var volIdCNFRM = '';
    var reservationIdCNFRM = '';
    var NomUserCNFRM = '';
    var prenomUserCNFRM = '';
    var emailUserCNFRM = '';
    var telUserCNFRM = '';
    var nombrePlassUserCNFRM = '';

app.get('/succeeded/:volId/:reservationId/:NomUser/:prenomUser/:emailUser/:telUser/:nombrePlassUser',(req, res) =>{
    volIdCNFRM = req.params.volId;
    reservationIdCNFRM = req.params.reservationId;
    NomUserCNFRM = req.params.NomUser;
    prenomUserCNFRM = req.params.prenomUser;
    emailUserCNFRM = req.params.emailUser;
    telUserCNFRM = req.params.telUser;
    nombrePlassUserCNFRM = req.params.nombrePlassUser;
    alertmsg = '';
    var nombre_places_rest = 0;
    res.render('succeeded',{
        IdVol: volIdCNFRM,
        Idreservation: reservationIdCNFRM,
        UserNom: NomUserCNFRM,
        Userprenom : prenomUserCNFRM,
        Useremail : emailUserCNFRM,
        Usertel : telUserCNFRM,
        Usernombreplass : nombrePlassUserCNFRM,

    });
});

// app.get('/savepdf',(req, res) =>{
//     res.render('savepdf',{
//         IdVol: volIdCNFRM,
//         Idreservation: reservationIdCNFRM,
//         UserNom: NomUserCNFRM,
//         Userprenom : prenomUserCNFRM,
//         Useremail : emailUserCNFRM,
//         Usertel : telUserCNFRM,
//         Usernombreplass : nombrePlassUserCNFRM,

//     });
// });

//end test
    
// -------AFFICHE USER-----------// 


app.listen(PORT, () =>{
    console.log('sever Connected !');
})