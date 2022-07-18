const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('authorization');
    if(!token) return res.status(401).send('access Denied');

    try{
        const verified = jwt.verify(token, "secretkey");
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('invalid token');
    }
}
