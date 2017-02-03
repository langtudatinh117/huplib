var mongoose = require('./db');
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    fullName: String,
    class: String,
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String }
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


module.exports = mongoose.model('User', userSchema);