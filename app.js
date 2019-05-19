const express = require("express");
      app = express(),
      http = require("http").Server(app),
      io = require("socket.io")(http),
      auth = require("./Firebase_DB/Authentifacation"),
      ServerDB = require("./ServerSideDB/Main");
      

io.on("connection", function(socket){

  // -------- // Requesting Login
  socket.on("Login", async function(LoginCredential){
    await auth.processLogin(LoginCredential)
    .then((res)=>{
      return io.emit("LoginState", res);
    });

    return "Failed"
  });

  // -------- // Requesting user Profile data from DB 
  socket.on("LoadAccount", function(Userdata){
    
    // Sends data to be rendered in the DB 
    ServerDB.InitiateUser(Userdata).then((res)=>{
      // console.log(res)
      
      io.emit("LoadDetails",res)
    }); 

  });


  // Emit user who disconnected
  socket.on("UserDisconnect", function(Userdata){
    console.log(Userdata,"Has Disconnected")
  });

});


app.set("view engine", "ejs");

// ---- // Middleware
app.use("/public",express.static("public"));  

app.get("/", function(req, res) {
  res.render("Authentification");
});

app.get("/chat",(req,res)=>{
    res.render("Inbox")
})

// Mocha Testing Site
app.get("/mocha",(req,res)=>{
  res.render("mocha-test")
})

// Server 
http.listen(process.env.PORT || 8080, function(){
    console.table({"Host URL --> ":"http://localhost:8080"});
  });


// Reloading HTML fILE
const path = require("path");
const livereload = require("livereload").createServer({
  exts:["ejs","js","css"]
});

livereload.watch(path.join(__dirname,"views"));
livereload.watch(path.join(__dirname,"public"));