require('dotenv').config();
require('./models/mongodb.js');
const express =require("express");
const cors = require('cors');
const auth_route = require('./router/auth_route.js');
const apis = require('./router/apis.js');
const { cookie_check_auth } = require('./middle_wheres/cookie_check_auth.js');
const cookieparser = require('cookie-parser')
const fs = require('fs')
const http = require('http')

const app=express();


let options={
    key:fs.readFileSync(__dirname+"/ssl/key.pem") ,
    cert: fs.readFileSync(__dirname + "/ssl/cert.pem")
}
let server=http.createServer(options,app)
// app.use(cors(
//     {
//         origin: ["http://localhost:4000"]
//         ,methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
//     }
// ));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization,');
    res.header('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE, OPTIONS')
    next();
});
app.use(cookieparser())

// app.use(express.urlencoded({
//     extended: true}
// ));

app.use(express.json())

app.use("/", express.static(__dirname + "/public"))

app.set("view engine",'ejs');

app.use("/auth",auth_route)
app.use("/api",apis)

app.get("/",cookie_check_auth,(req,res)=>{
    
    //console.log(req.user)
    res.render("index.ejs",{user:req.user})
});

server.listen(3000)