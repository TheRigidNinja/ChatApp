const express = require("express");
      app = express(),
      http = require("http").Server(app),
      io = require("socket.io")(http),
      auth = require("./serverSide/firebaseRequest/authentifacation"),
      msgHandler = require("./serverSide/serverRequest/msgHandler"),
      requestServerDB = require("./serverSide/serverRequest/requestServerDB");


// Listens for connections from Client-Side
io.on("connection", function(socket){

    // -------- // Requesting Login
    socket.on("Login", function(LoginCredential, userServeKey){
        auth.processLogin(LoginCredential)
        .then((res)=>{
            return io.emit("LoginState", res, userServeKey);
        });

        return "Failed"
    });

    // -------- // Requesting user Profile data from DB 
    socket.on("LoadAccount", function(Userdata, userServeKey){
      
        requestServerDB.InitiateUser(Userdata).then((res)=>{
            io.emit("LoadDetails",res,userServeKey)
        }); 
    });


    // -------- // Requesting Private messages
    socket.on("PrivateMessagingLine", function(Userdata,msgKey,userServeKey){

      // Load message from DB
      if(Userdata.actionType === "Get"){ 
        msgHandler.msgLoader(msgKey).then((res)=>{
          io.emit("PrivateMessagingLine",res,userServeKey)
        });
      }

      // Write message to DB
      if(Userdata.actionType === "Set"){ 
        msgHandler.msgWriter(Userdata.MessageDetail,msgKey).then((res)=>{
              io.emit("PrivateMessagingLine",res,userServeKey);
          });
      }

      // Load thumbnail message from DB
      if(Userdata.actionType === "GetThumbnail"){ 
        msgHandler.msgThumbnail(msgKey).then((res)=>{
              io.emit("Thumbnail",res,userServeKey);
          });
      }
    });


  // Emit users who disconnected
  socket.on("UserDisconnect", function(Userdata){
    console.log(Userdata,"Has Disconnected")
  });



})




app.set("view engine", "ejs");

// ---- // Middleware
app.use("/public",express.static("public"));  
app.use("/test",express.static("test"));  
app.use("/node_modules",express.static("node_modules"));  


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
livereload.watch(path.join(__dirname,"test"));

