var nJwt = require('njwt');
const secretKey = require('uuid/v4')();
module.exports = {
    create: function(username) {
        let claims = { sub: username };
        let jwt = nJwt.create(claims, secretKey, 'HS512');
        jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000));
        let token = jwt.compact();
        return token;
    },
    verify: function(token) {
        try {
            return nJwt.verify(token, secretKey, 'HS512');
        } catch (e) {
            return e;
        }
    }

}