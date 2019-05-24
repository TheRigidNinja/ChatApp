const express = require("express");
      app = express(),
      http = require("http").Server(app),
      io = require("socket.io")(http);
    //   auth = require("./Firebase_DB/Authentifacation"),
    //   ServerDB = require("./ServerSideDB/Main");


// Listens for connections from Client-Side
io.on("connection", function(socket){

    console.log("Now live")

})




app.set("view engine", "ejs");

// ---- // Middleware
app.use("/public",express.static("public"));  

app.get("/", function(req, res) {res.render("Login");});
app.get("/chat",(req,res)=>{res.render("Inbox")});
app.get("/mocha",(req,res)=>{res.render("BrowserTest")});

// Making Server Live
http.listen(process.env.PORT || 8080, function(){
    console.table({"Host URL --> ":"http://localhost:8080"});
});

// Reloadings Files in Browser
const path = require("path");
const livereload = require("livereload").createServer({
  exts:["ejs","js","css"]
});

livereload.watch(path.join(__dirname,"views"));
livereload.watch(path.join(__dirname,"public"));


