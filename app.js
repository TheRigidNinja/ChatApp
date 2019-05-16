const express = require("express");
      app = express(),
      http = require("http").Server(app),
      io = require("socket.io")(http),
      auth = require("./Firebase_DB/Authentifacation"),
      fireStoreHandler = require("./Firebase_DB/FireStoreHandler"),
      ServerDB = require("./ServerSideDB/Main");
      


io.on("connection", function(socket){
//   var userss = {
//     Msg:{
//         Requests: "-",
//         LastTime:"-",
//         LastMsg:"-",
//     },
//     State: "Online",
//     UserName: "objId",
//     UserId: "-",
//     Picture: "-"
// }

// fireStoreHandler.WriteProfileToDB(userss).then((res)=>{
//   console.log(res);
// })

  // socket.emit("LoadDetails","NewConnection");

  // -------- // Requesting Login
  socket.on("Login", async function(LoginCredential){
    const response = await auth.processLogin(LoginCredential)
    .then((response)=>{
      if(response.UserId){
        response.UserId = response.UserId.slice(response.UserId.length/2);
      }

      return io.emit("LoginState", response);
    });

    return "Failed"
  });


   // -------- // Verify user logins
  socket.on("Verify", function(data){
    console.log(data)
  })




  // -------- // Requesting user Msg data from DB 
  socket.on("LoadAccount", async function(data){

    ServerDB.InitiateUser(data).then((res)=>{
      console.log(res)
      // io.emit("LoadDetails",res)
    }); 

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