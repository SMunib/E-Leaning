exports.register = async (req,res) =>{
    console.log(req.body);
    res.send("Form submitted");
}