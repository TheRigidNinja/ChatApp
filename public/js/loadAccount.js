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
                msgKey:GetsCookie("msgKey"),
                newUser:Boolean(GetsCookie("newUser"))
            }}
        })(),SetserverUserId());
    }
};CheckLogins();

// Loads user account
socket.on('LoadDetails', function(LoadAccount,userServeKey){

    if(GetserverUserId(userServeKey) == true){
        HandleOnlineUsers(LoadAccount);
        ShowUserChats(LoadAccount);
    }
})


// Displays users online
function HandleOnlineUsers(userData){
    $(".onlinePeople").empty();
    let myUserName = GetsCookie("userName");


    let Person = `<div class="Onlineperson story" data-UserID=${userData[myUserName].msgKey}><img src="../public/Img/Story.svg"><h6>Your story</h6></div>`;

    for (let elm in userData){
        if(userData[elm].state === "Online" && myUserName != elm ){
            Person+=`<div class="Onlineperson" data-UserID=${userData[elm].msgKey} onclick="pageToggleToMsg(event)" style="display:inline-block"><img src="${userData[elm].picture}"><span id="status"></span><h6>${userData[elm].userName}</h6></div>`
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
        Person = "",
        myUserName = GetsCookie("userName");
        

    for (let elm in userData){
        console.log(myUserName,elm);
        if(myUserName != elm ){ // Prevent displaying me
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

            Person+=`<div class="Person" onclick="pageToggleToMsg(event)" style="display:inline-flex" data-UserID=${userData[elm].msgKey}><span id="ProfilePic"><img src=${userData[elm].picture}>${onlineStatus}</span><div class="details"><h4>${userData[elm].userName}</h4><p style="color:${color};font-weight:${fontweight}">👋 Say hi to ${userData[elm].userName}</p></div><time>${"8:40pm"}</time></div>`
        }
    }
    $(Person).appendTo( ".InboxPeople" );

    return true
}