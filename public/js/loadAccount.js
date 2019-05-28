var socket = io();

// Check on Disconnect
window.onbeforeunload = function(){    
    socket.emit("UserDisconnect",GetsCookie("userName"));
}


// Check user Login state if not return them on login page
function CheckLogins(){ 

    if(GetsCookie("userIdentifier").length < 8){

        window.location.href ="/"; 

    }else{
        // Initiate user on connect 
        socket.emit("LoadAccount",(function(){
            let userName = GetsCookie("userName");
            
            return {[userName]:{
                state:GetsCookie("state"),
                userName: userName,
                userId: GetsCookie("userIdentifier"),
                picture:GetsCookie("picture"),
                newUser:Boolean(GetsCookie("newUser"))
            }}
        })());
    }
};CheckLogins();


// Loads user account
socket.on('LoadDetails', function(LoadAccount){
    HandleOnlineUsers(LoadAccount);
    ShowUserChats(LoadAccount);

})


// Displays users online
function HandleOnlineUsers(userData){
    $(".onlinePeople").empty();

    let Person = `<div class="Onlineperson" onclick="pageToggle(event,'Story')"><img src="../public/Img/Story.svg"><h6>Your story</h6></div>`;

    for (let elm in userData){
        if(userData[elm].state === "Online"){
            Person+=`<div class="Onlineperson"data-UserID=${Math.random()}onclick="pageToggle(event,'Onlineperson')"style="display:inline-block"><img src="${userData[elm].picture}"><span id="status"></span><h6>${userData[elm].userName}</h6></div>`
        }
    }
    
    $(Person).appendTo( ".onlinePeople" );

    return true
}



// Displays messages
function ShowUserChats(userData){
    $(".InboxPeople").empty();

    let color = "initual",
        fontweight = "initual",
        Person = "";
        

    for (let elm in userData){
        // Changes user online status
        let onlineStatus= "";
        if(userData[elm].state !== "Online"){
            onlineStatus = `<span id="status"></span>`
        }

        // Change font-color
        // if(userData[elm].Msg.lastMsg.slice(0,4) !== "You:" && userData[elm].Msg.state === true){
        //     color = "rgb(120, 120, 120)";
        //     fontweight = "450";
        // }else{
        //     color = "initual";
        //     fontweight = "initual";
        // }

        Person+=`<div class="Person" data-UserID=${Math.random()} onclick="pageToggle(event,'msgPerson')" style="display:inline-flex"><span id="ProfilePic"><img src=${userData[elm].picture}>${onlineStatus}</span><div class="details"><h4>${userData[elm].userName}</h4><p style="color:${color};font-weight:${fontweight}">👋 Say hi to ${userData[elm].userName}</p></div><time>${"8:40pm"}</time></div>`
    }

    $(Person).appendTo( ".InboxPeople" );

    return true
}