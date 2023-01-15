const express = require("express");
const path = require("path");
const app = express();
const {modelUser} = require("./user");
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "pug");
app.set("views","./public");
app.get("/",(req, res)=>{
    res.render("index.pug");
});

app.get("/signup",(req, res)=>{
    res.render("signup.pug");
});
app.post("/registrer",(req, res)=>{
    const {username, password} = req.body;
    const user = new modelUser({"name":username, "password":password});
    user.save().then(response=>{
        console.log("Registrado");
        res.render("index.pug")
    }).catch(err=>{
        console.log("Error Save :",err);
    })
});
app.post("/authenticate",(req, res)=>{
    const {username, password} = req.body;
    
    modelUser.findOne({"name": username}).then((response)=>{
        if(response){
            response.isCorrectPassword(password, (result)=>{
                if(result){
                    console.log("Inicio de Sesion Correcto");
                    res.render("index.pug");
                }else{
                    console.log("usuario o contraseña incorrectos");
                    res.render('signup.pug');
                }
            });
        }else{
            console.log("Usuario no encontrado");
        }
    }).catch(error=>{
        console.log("Error FindOne: ", error);
    })
});
app.listen(port,()=>{
    console.log("on server listening: ", port)
})