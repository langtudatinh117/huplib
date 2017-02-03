const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/user');
var bcrypt = require('bcrypt');
var token = require('./lib/token');
const saltRounds = 10;

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
                    console.log(token.create(req.body.username));
                    console.log(token.verify(token.create(req.body.username)));
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