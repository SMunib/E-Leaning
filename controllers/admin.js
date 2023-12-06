const mydb = require('../routes/db');
const util = require('util');
const queryAsync = util.promisify(mydb.query).bind(mydb);

exports.CheckRequests = async(req,res) =>{
    const query = 'Select Requests from admin';
    try{
        const results = await queryAsync(query);
        if(!results.length){console.log("error");return res.status(401).json({message:'No requests found',success:false})};
        return res.status(201).json({success:true,message:'Requests Found',data:results});
    }catch(err){
        console.log("error"+err);
        return res.status(500).send();
    }
};

exports.CheckResponse = async(req,res) =>{
    const query = 'Select Responses from admin';
    try{
        const results = await queryAsync(query);
        if(!results.length){return res.status(401).json({message:'No response found'})};
        return res.status(201).json({success:true,message:'Response Found',data:results});
    }catch(err){
        console.log("error"+err);
        return res.status(500).send();
    }
};


exports.giveResponse = async(req,res) => {
    //get requestID somehow
    const {answer} = req.body;
    const query = 'Update admin set Responses =? where RequestID = ?';
    try{
        const results = await queryAsync(query,[answer]);
        if(!results.length){return res.status(401).json({message:'Error while sending'})};
        res.status(201).json({success:true,message:'Response Recorded',data:results});
    }catch(err){
        console.log("error"+err);
        return res.status(500).send();
    }
}

exports.SendRequest = async(req,res) =>{
        const {Request}= req.body;
        // console.log("req: ",Request);
        const query = 'insert into admin (Requests) values (?)';
        // console.log(query);
        try{
            const results = await queryAsync(query,[Request])
            if(results.affectedRows === 0){return res.status(401).json({message:'Error while sending',success:false})};
            res.status(201).json({success:true,message:'Request Sent'});
        }catch(err){
            console.log("error"+err);
            return res.status(500).send();
        }
}