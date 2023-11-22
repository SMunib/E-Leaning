const mysql = require('mysql')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, './.env') })

//create the Connection 
    const connectionConfig = {
        host: process.env.Database_Host,
        user: process.env.Database_User,
        password: process.env.Database_Password,
        database: process.env.Database,
    }
    const db=mysql.createConnection(connectionConfig);

//connect to Server
    db.connect((err) => {
    if(err) {
        console.log("Error: " +err);
        return;
    }
    console.log("Connection Successful!");

});

const query = (queryString,callback) =>{
    db.query(queryString,(err,result) => {
        if (err) throw err;
        callback(result);
    });
};

module.exports = db;