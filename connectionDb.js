const mongoose = require("mongoose");

const mongoseeConnect =()=>{
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/user",(err)=>{
            if(err) throw err;
        });
        console.log("Connected to MongoDb");
    }catch(error){
        console.log("Error connect mongodb: ", error);
    }
}

module.exports = {mongoseeConnect, mongoose}