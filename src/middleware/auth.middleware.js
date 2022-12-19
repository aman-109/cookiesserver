

const jwt = require('jsonwebtoken')

let blacklist = [];
const verifyToken = async function(req, res, next) {
//   const token = req.headers["authorization"];
// console.log(req.cookies)
const token=req.cookies.token
  if (!token) {
    
    return res.status(401).send("Unauthorized");
  }
  if (blacklist.includes(token)) {
    return res.status(401).send("Token Expired");
  }
  try {
    const verification = await jwt.verify(token, "BLOG109");
    if (verification) {
      req.userId = verification.id;
      next();
    } else {
      res.status(401).send("Operation not allowed.");
    }
  } catch (e) {
    return res.send(e.message);
  }
};

module.exports=verifyToken