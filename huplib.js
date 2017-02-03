const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const nJwt = require('njwt');
const secretKey = require('uuid/v4')();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.render("index.ejs");
})


app.post('/register', (req, res) => {
    var acc = new User(req.body);
    acc.save()
        .then(function(user) {
            res.json({ 'status': 'success' })
        })
        .catch(function(err) {
            if (err.message.search(/username_. dup key/i) != -1) {
                res.json({ 'status': 'error', 'message': '<li><b>Tên đăng nhập đã được sử dụng</b></li>' });
            } else if (err.message.search(/email_. dup key/i) != -1) {
                res.json({ 'status': 'error', 'message': '<li><b>Email đã được đăng ký</b></li>' });
            }
        })
})

app.post('/login', (req, res) => {
    User.findOne({ 'username': req.body.username })
        .then(function(user) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (!result) {
                    res.json({ 'status': 'error', 'message': '<b>Mật khẩu không chính xác</b>' });
                } else {
                    console.log(user.email);
                    let claims = {
                        sub: req.body.username
                    }
                    let jwt = nJwt.create(claims, secretKey, 'HS512');
                    jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000));
                    let token = jwt.compact();
                    console.log(token);

                    nJwt.verify(token, secretKey, 'HS512', function(err, verifiedJwt) {
                        if (err) {
                            console.log(err); // Token has expired, has been tampered with, etc
                        } else {
                            console.log(verifiedJwt); // Will contain the header and body
                        }
                    });
                    res.json({ 'status': 'success' });
                }
            })
        })
        .catch(function(err) {
            res.json({ 'status': 'error', 'message': '<b>Tên đăng nhập không tồn tại</b>' })
        })


})

app.listen(3000, () => {
    console.log('listening on 3000');
});