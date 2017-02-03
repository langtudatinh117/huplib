var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbURI = 'mongodb://daoan:csfQ3zMfgL2NXk7T@ds137759.mlab.com:37759/huplib';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected');
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;