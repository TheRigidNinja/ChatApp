const express = require("express");
      app = express(),
      http = require("http").Server(app),
      io = require("socket.io")(http),
      auth = require("./Firebase_DB/Authentifacation"),
      userFireStoreDB = require("./Firebase_DB/FireStoreHandler"),
      ServerDB = require("./ServerSideDB/Main");


io.on("connection", function(socket){
  socket.emit("LoadAccount","--")
  // -------- // Requesting Login
  socket.on("Login", async function(LoginCredential){
    const response = await auth.processLogin(LoginCredential)
    .then((response)=>{
      return io.emit("LoginState", response);
    });
    return "Failed"
  });


  // -------- // Requesting user Msg data from DB 

  socket.on("LoadAccount", async function(data){
    io.emit("LoadDetails",data);

    // ServerDB.InitiateUser(data).then((res)=>{
    //   io.emit("LoadDetails",res)
    // }); 
  });

});


app.set("view engine", "ejs");

// ---- // Middleware
app.use("/public",express.static("public")); 

app.get("/chat",(req,res)=>{
    res.render("Inbox")
})

app.get("/", function(req, res) {
    res.render("Authentification");
  });

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