const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
 const ejs = require('ejs');
require('dotenv').config();


const app = express();

//setting up of template engine
 app.set('view engine', 'ejs');


//Handling of static page
app.use(express.static(__dirname + "/public"));

//Data parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//@Resume page
app.get('/', (req, res) => {
    res.render('home');
});

// Success page indicating mail sent
app.get('/success', (req, res) => {
    res.render('success');
});

//Failure page indicating inability to send mail
app.get('/failure', (req, res) => {
    res.render('failure');
});

//Handles sending of message from the contact form
app.post('/', (req, res) => {
    console.log(req.body);

    
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
         user: 'moshud-lanre@outlook.com',
         pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
      }
});
    

    const mailOptions = {
        from: 'moshud-lanre@outlook.com',
        to: 'lanremoshud@gmail.com',
        subject: `Message from ${req.body.mail}: ${req.body.subject}`,
        text: req.body.text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err.message);
            res.redirect('/failure');
        }else {
            res.redirect('/success');
            console.log('Mail sent: ' + info.response);
        }
        
    })
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.log(`Server is running on port ${port}`));