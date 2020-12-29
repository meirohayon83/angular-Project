const jwt = require ('jsonwebtoken')


// check the token if verify in every route that inport
 
  module.exports = function verify (req, res, next) {

     const head = req.headers['authorization']
  
        if (typeof head !== "undefined") {
  
     const bearer = head.split(' ')[1];
     const verified = jwt.verify(bearer, process.env.TOKEN_SECRET , function(err, token) {

        if(err){ 
           return res.status(401).send(err.message),
           console.log(err);
        }

        req.activeToken = bearer
        next()
      
      })
    }}
