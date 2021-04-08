/**** Import npm libs ****/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
    // CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});



const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql');
const fs = require('fs');
const bcrypt = require('bcrypt');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/front/'));
app.use(urlencodedParser);
app.use(session);

//Connexion à la base de donnée
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stratego"
});

con.connect( err => {
    if (err) throw err;
    else console.log('Connexion a mysql effectuee');
});
/***************/

io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));


/******************/
http.listen(4000, () => {
    console.log('Serveur lancé sur le port 4000');
})



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/Front/Html/accueil.html');
    let sessionData = req.session;
});

// Directement après la connexion d'un socket au serveur
io.on('connection', (socket) => {
    
    socket.on("username", (info) => {
        let sql = "SELECT username FROM users WHERE username = ?";
        con.query(sql, [info[0]], (err, res) => {
            if (err) throw err;
            socket.emit("resultUser",res)
        });
    });


    socket.on("login",(info)=>{
        let sql = "SELECT id, username FROM users WHERE username = ? and password = ?";
        con.query(sql, [info[0], info[1]], (err, res) => {
            if(err) throw err;

            socket.emit("resultLogin",res)
        });
    });



    socket.on("register", (info) => {
        let sql = "INSERT INTO users VALUES (default,?,?,?)";
        con.query(sql, [info[0], info[1],info[2]], (err, res)=> {
            if (err)throw err;

            console.log("Compte crée");
        });
    });


    socket.on("cryptage", (info) =>{
        bcrypt.hash(info,10, function (err, res){
            if (err) throw err;
            socket.emit("resultCryptage",res);
        });
    });

    
    socket.on("decryptage", (info) => {
        bcrypt.compare(info[0], info[1], function (err, res) {
            if (err) throw err;
            console.log(res);
            socket.emit("resultDecryptage", res);
        });
    });
    
    socket.on("isSession",()=>{
        socket.emit("onSession",socket.handshake.session.username)
    });


    io.on ( 'connection' , function ( socket ) { 
        socket.to ( 'some room' ) .emit ( 'some event' ); 
      });



});

app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
    const login = req.body.login

    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array() });
    } else {
        // Store login
        req.session.username = login;
        req.session.save()
        res.redirect('/');
    }

});



