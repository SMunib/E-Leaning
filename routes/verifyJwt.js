const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    // console.log("token: ",token);
    if(!token){return res.json("Please Provide Token")};
    // console.log("token:",token);
    const tokenWithoutBearer = token.replace(/^Bearer\s/, '');
    // console.log("JWTSecretKey")
    jwt.verify(tokenWithoutBearer,'JWTSecretKey',(err,decoded)=> {
        if(err){
            console.log(err);
            return res.status(401).json({message:"UnAuthorized"});}
        // console.log(decoded.userid);
        req.userid = decoded.userid;
        // console.log("userid: ",req.userid);
        next();
    });
};
