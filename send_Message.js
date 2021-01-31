var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tmail1058@gmail.com',
    pass: 'test@2020'
  }
});

var mailOptions = {
  from: 'tmail1058@gmail.com',
  to: 'othmanehannoune1@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'wal3aydi!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});