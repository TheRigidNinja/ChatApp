var socket = io();


// Requests account details 
// socket.emit("Verify", "Login");


socket.on('LoadAccount', function(LoadAccount){
    console.log(LoadAccount);

    // CheckLogins();

    // HandleOnlineUsers(LoadAccount);
    // ShowUserChats(LoadAccount);
})



function CheckLogins(){

    // let identifier = false,
    //     userIdentifier = localStorage.getItem('userIdentifier');

    console.log(document.cookie);
    // document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";

    return null
}



function GetsCookie(){
    // let d = new Date();

    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    // let expires = "expires="+ d.toUTCString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    return "Success"
}




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

