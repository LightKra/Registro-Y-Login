const  {mongoseeConnect, mongoose} = require("./connectionDb");
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
mongoseeConnect();
const saltRounds = 10;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
schema.pre("save", function (next) {
    if(this.isNew || this.isModified("password")){
        const document = this;
        bcrypt.hash(document.password, saltRounds, function(err,hash){
            if(err){
                next(err);
            }else{
                document.password = hash;
                next();
            }
        })
    }else{
        next();
    }
})
schema.methods.isCorrectPassword = async function(password, callback){
    return await bcrypt.compare(password, this.password).then(result=>{
        callback(result);
    }).catch(error=>{console.log("Error compare pass: ", error);});
}

const modelUser = mongoose.model("user", schema);
module.exports = {modelUser}