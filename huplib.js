const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = require('uuid/v4');
const app = express();

var db;

MongoClient.connect('mongodb://daoan:csfQ3zMfgL2NXk7T@ds137759.mlab.com:37759/huplib', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.render("index.ejs");
})


app.post('/register', (req, res) => {
    db.collection('acc').findOne({
        $or: [
            { 'username': req.body.username },
            { 'email': req.body.email }
        ]
    }, (err, result) => {
        if (result === null) {
            bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                req.body.password = hash;
                db.collection('acc').save(req.body, (err, result) => {
                    if (err) return console.log(err);
                    console.log('saved to database');
                    res.json({ 'status': 'success' })
                })
            });
        } else {
            let json_respon = { 'status': 'error', 'message': '' };
            if (result.email === req.body.email) json_respon.message += '<li><b>Email đã được đăng ký</b></li>';
            if (result.username === req.body.username) json_respon.message += '<li><b>Tên đăng nhập đã được sử dụng</b></li>';
            res.json(json_respon);
        }
    })



})

app.post('/login', (req, res) => {
    db.collection('acc').findOne({ 'username': req.body.username }, function(err, info) {
        if (err) {
            console.log(err)
            res.redirect('/');
        };
        console.log(info);
    });

})