// var socket = io();

$(document).ready(()=>{
    // ------// Binding actions to buttons
    $("#inbox").bind("click",()=>Distributer("inbox"));
    $("#friends").bind("click",()=>Distributer("friends"));
    $("#profile").bind("click",()=>Distributer("profile"));
    $("#loginPage").bind("click",()=>Distributer("loginPage"));

    // initiating start
    $("#inbox").css("color","#726dbd");

    // Takes User to login page if they haven't yet signed in
    setTimeout(function(){
        var windHref = window.location.href;
        if (windHref.slice(windHref.indexOf("?")+1,windHref.length) != localID){
            window.location.replace("/")
        }
    },50)

    // Distributes keys to other functions
    function Distributer(typeId){
        ToggleFooterColor(typeId);
        PageToggle(typeId);
    }


})


// Toggle footer menu color 
function ToggleFooterColor(iconType){
    $(".subMenu").find("i").css({
        "color":"#b6bec5",
        "text-shadow": "none"
    });

    $(`#${iconType}`).find("i").css("color","#726dbd");

    const footToggle = {
        "profile":()=>{
            $(".subMenu").css("background","#726dbd")
            .find("i").css("color","white");
            $("#profile").find("i").css("text-shadow","0px 0px 15px rgba(0,0,0,0.4")
        },
        "friends":()=>{$(".subMenu").css("background","white")},
        "inbox":()=>{$(".subMenu").css("background","white")},
        "loginPage":()=>{
            window.location.replace("/");
            return "Clean Exit"
        }
    }
    console.log(footToggle[iconType]())
}

// ------------ // Make Page Toggle 
function PageToggle(typePage){
    const pageType = {
        "profile":()=>{
            $(".onlineSection, .head, .onlinePeople, .InboxPeople").css({"height":"0","opacity":"0"});
            $(this).css("display","none")
            $(".UserProfile").css({"display":"block","opacity": 1})
            $(".peopleSection").css({"height": "calc(100% - 90px)","overflow":"hidden"})

            return "Profile Transition Success"
        },
        "friends":()=>{ 
            $("#LogoDescription").html("Friends")
            $(".UserProfile,.onlinePeople").css({"display":"none"});
            $(".onlineSection, .head, .onlinePeople, .InboxPeople").css({"height":"100%","opacity":"1"});
            $(".onlineSection").css("height","20px")  

            return "FriendList Transition Success"
        },
        "inbox":()=>{
            $("#LogoDescription").html("Chats")
            $(".UserProfile").css({"display":"none"});
            $(".onlineSection, .head, .onlinePeople, .InboxPeople").css({"height":"100%","opacity":"1"});
            $(".onlinePeople").css("display","block");
            $(".onlineSection").css("height","125px");   

            return "Inbox Transition Success"
        },
        "loginPage":()=>{return null}
    }
    console.log(pageType[typePage]())
}