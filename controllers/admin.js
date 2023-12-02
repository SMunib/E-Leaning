const mydb = require('../routes/db');
const util = require('util');
const queryAsync = util.promisify(mydb.query).bind(mydb);

exports.CheckRequests = async(req,res) =>{
    const query = 'Select RequestID,Request from admin';
    try{
        const results = await queryAsync(query);
        if(!results.length){return res.status(401).json({message:'No requests found'})};
        return res.status(201).json({success:true,message:'Requests Found',data:results});
    }catch(err){
        console.log("error"+err);
        return res.status(500).send();
    }
};

exports.CheckResponse = async(req,res) =>{
    const query = 'Select RequestID,Response from admin';
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
    const {Response} = req.body;
    const query = 'Update admin set Response where RequestID = ?';
    try{
        const results = await queryAsync(query,[Response,RequestID]);
        if(!results.length){return res.status(401).json({message:'Error while sending'})};
        res.status(201).json({success:true,message:'Response Recorded',data:results});
    }catch(err){
        console.log("error"+err);
        return res.status(500).send();
    }
}

exports.SendRequest = async(req,res) =>{
        const {Request}= req.body;
        console.log("req: ",Request);
        const query = "Insert into admin set ?";
        console.log(query);
        try{
            await queryAsync(query,[Request],(err)=>{
                if(err){
                    console.log('Error: Failed to insert into database: '+err);
                    return res.status(400).json({message:err.message});
                  }
                // if(!results.length){return res.status(401).json({message:'Error while sending'})};
                res.status(201).json({success:true,message:'Request Sent'});
            });
        }catch(err){
            console.log("error"+err);
            return res.status(500).send();
        }
}