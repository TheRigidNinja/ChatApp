const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const auth = require("./Firebase_DB/Authentifacation");
const Msging = require("./Firebase_DB/Msg-DB");

var UsersData ={
  "TempUserId": null,
  "ActiveUsers":[],
  "People":["TheRigidNinja56","Overload","loneWalker"],
}


io.on("connection", function(socket){

  // -------- // Requesting Login
  socket.on("Login", async function(LoginCredential){
    const response = await auth.processLogin(LoginCredential).then((response)=>{

      // Sets user ID
      if (response.UserId !== undefined){
          UsersData.TempUserId = response.UserId.slice(0,15)
          UsersData.People.push(response.userName)
      }

      io.emit("LoginState", response);
    });
  });


  // -------- // Requesting user Msg data from DB 
  socket.on("LoadAccount", async function(data){
    // const response = await Msging.Msging(["UserNeedData",Messages]).then((response)=>{
    //   console.log(LoadAccount);
    // });
    // UsersData.TempUserId = data
    io.emit("LoadDetails", UsersData);
    
  });

// Render users if they existes in DB
  // io.emit("CheckUserLogin", "Checking");
  // socket.on("CheckUserLogin", function(logins){

  // })

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

http.listen(8080, function(){
    console.table({"Host URL --> ":"http://localhost:8080"});
  });


// Reloading HTML fILE
const path = require("path");
const livereload = require("livereload").createServer({
  exts:["ejs","js","css"]
});

livereload.watch(path.join(__dirname,"views"));
livereload.watch(path.join(__dirname,"public"));