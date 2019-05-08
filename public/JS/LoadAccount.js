var socket = io();
var connected = false;
var localID = "";

socket.emit("LoadAccount", [{
    Msg:{Requests: "?",lastTime:"9:34am",lastMsg:"You: Good morning, what have you got planned for the day",state: false},
    State: "Online",
    UserId: "VrIhhr6yT6UHV2",
    userName: "RigidNinja",
    picture: "https://i.pinimg.com/736x/70/7b/19/707b1901d4cbedb7fc4bfb69835ccdf0.jpg"
  },
  {
    Msg:{Requests: "?",lastTime:"3:20pm",lastMsg:"Hey Man what are you up to?",state: true},
    State: "Offline",
    UserId: "VrIhhr6yT6UHV2",
    userName: "Kathy Brin",
    picture: "http://static1.squarespace.com/static/56a500630ab377f6ac0574d3/t/56a7faa11c1210ac8bef5abf/1453849251149/Screen+Shot+2016-01-26+at+4.59.56+PM.png?format=1500w"
  },
  {
    Msg:{Requests: "?",lastTime:"3:40pm",lastMsg:"You: I'm just kidding about the stuff the other day",state: false},
    State: "Online",
    UserId: "VrIhhr6yT6UHV2",
    userName: "Helledrat54",
    picture: "https://cdn.mmos.com/wp-content/gallery/publisher-profiles/daybreak-game-company-logo.jpg"
  },
  {
    Msg:{Requests: "?",lastTime:"1:10pm",lastMsg:"Hi there Whats going on with you this days?",state: false},
    State: "Online",
    UserId: "VrIhhr6yT6UHV2",
    userName: "Macen Froad",
    picture: "https://pbs.twimg.com/profile_images/1106804980/twitterProfile_400x400.gif"
  }]);
 
socket.on('LoadDetails', function(LoadAccount){
    HandleOnlineUsers(LoadAccount);
    ShowUserChats(LoadAccount);
})


function HandleOnlineUsers(userData){
    for (let i = 0; i < userData.length; i++) {
        if(userData[i].State === "Online"){
            const clonePerson =  $(".Template1").clone().appendTo( ".onlinePeople" );
            clonePerson.removeClass("Template1")
            .css("display","inline-block")
            .attr("data-UserID",Math.random())
            .find("h6").html(userData[i].userName);

            if (userData[i].picture !== ""){
                clonePerson.find("img").attr("src",userData[i].picture);
            }
        }
    }
}


// function RemoveOnlineStatus(){
// }

function ShowUserChats(userData){
    let color = "initual",
        fontweight = "initual";

    for (let i = 0; i < userData.length; i++) {
        const clonePerson =  $(".Template2").clone().appendTo( ".InboxPeople" );

        clonePerson.removeClass("Template2")
        .css("display","inline-flex")
        .attr("data-UserID",Math.random())
        .find(".details").find("h4").html(userData[i].userName);
        
        if(userData[i].Msg.lastMsg.slice(0,4) !== "You:" && userData[i].Msg.state === true){
            color = "rgb(120, 120, 120)";fontweight = "450";
        }else{
            color = "initual";fontweight = "initual";
        }

        clonePerson.find(".details").find("p")
        .css({"color":color,"font-weight":fontweight})
        .html(userData[i].Msg.lastMsg);

        clonePerson.find("time").html(userData[i].Msg.lastTime);

        if (userData[i].picture !== ""){
            clonePerson.find("img").attr("src",userData[i].picture);
        }

        if(userData[i].State !== "Online"){
            clonePerson.find("#status").remove();
        }
    }
}

// function LoadUserProfile(){
    
// }

