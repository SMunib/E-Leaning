const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){return res.json("Please Provide Token")};
    jwt.verify(token,'JWTSecretKey',(err,decoded)=> {
        if(err){return res.status(401).json({message:"UnAuthorized"});}
        req.userid = decoded.userid;
        console.log("userid: ",userid);
        next();
    });
};
