var socket = io();
var connected = false;
var localID = "";

socket.emit("LoadAccount",null);
socket.on('LoadDetails', function(LoadAccount){

    // if(connected == false){
        // console.log(LoadAccount);
        localID = LoadAccount.TempUserId
        console.log(LoadAccount)
        LoadAccount.People.forEach(element => {
            ShowExistingUserChats(element)
        });
    // }

    connected = true;
    // console.log("object")
})


function ShowOnlineStatus(){
}


function RemoveOnlineStatus(){
}

function ShowExistingUserChats(userInfor){

    const clonePerson =  $(".Template2").clone().appendTo( ".InboxPeople" );
    clonePerson.removeClass("Template2")
    .css("display","inline-flex")
    .attr("data-UserID",Math.random())
    .find(".details").find("h4").html(userInfor)
    .find(".details").find("p").html(userInfor);
}

function LoadUserProfile(){
    
}

