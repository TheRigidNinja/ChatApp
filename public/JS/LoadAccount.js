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


socket.on('LoadDetails', function(LoadAccount){
    HandleOnlineUsers(LoadAccount);
    ShowUserChats(LoadAccount);


    console.log(LoadAccount);

    // SetCookie("userName",cvalue)
})










function GetsCookie(key){

    var re = new RegExp(key + "=([^;]+)");
    var value = re.exec(document.cookie);

    return (value != null) ? value[1]: null;
}


// Sets a cookie 
function SetCookie(cname,cvalue){
    let d = new Date(),
    expires = "expires="+ d.setTime(d.getTime() + (1*24*60*60*1000));

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    return "Success"
}



function HandleOnlineUsers(userData){

    for (let elm in userData){
        if(userData[elm].state === "Online"){
            const clonePerson =  $(".Template1").clone().appendTo( ".onlinePeople" );
            clonePerson.removeClass("Template1")
            .css("display","inline-block")
            .attr("data-UserID",Math.random())
            .find("h6").html(userData[elm].userName);

            // if (userData[i].picture !== ""){
            //     clonePerson.find("img").attr("src",userData[i].picture);
            // }
        }
    }

    return true
}


function ShowUserChats(userData){
    let color = "initual",
        fontweight = "initual";

    for (let elm in userData){
        const clonePerson =  $(".Template2").clone().appendTo( ".InboxPeople" );

        clonePerson.removeClass("Template2")
        .css("display","inline-flex")
        .attr("data-UserID",Math.random())
        .find(".details").find("h4").html(userData[elm].userName);
        
        // if(userData[i].Msg.lastMsg.slice(0,4) !== "You:" && userData[elm].Msg.state === true){
        //     color = "rgb(120, 120, 120)";fontweight = "450";
        // }else{
        //     color = "initual";fontweight = "initual";
        // }

        clonePerson.find(".details").find("p")
        .css({"color":color,"font-weight":fontweight})
        .html("👋 Say hi to "+userData[elm].userName);

        // clonePerson.find("time").html(userData[i].Msg.lastTime);

        if (userData[elm].picture !== "undefined"){
            clonePerson.find("img").attr("src",userData[elm].picture);
        }

        if(userData[elm].state !== "Online"){
            clonePerson.find("#status").remove();
        }
    }

    return true
}

// function LoadUserProfile(){
    
// }

