function pageToggle(e,type){
    let attr = e.target.parentNode.getAttribute("id"),
        pageType = attr!= null?attr:e.target.getAttribute("id");

    switch(true){
        case type === "footerPage":
            ToggleFooterColor(pageType);
            PageToggle(pageType)
        break

        case ["msgPerson","BackInbox"].includes(type) == true:
            PageToggle(type)
        break
    }
}


// Toggle footer menu color 
function ToggleFooterColor(iconType){
    $(".subMenu").find("i").css({"color":"#b6bec5","text-shadow": "none"});
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

    footToggle[iconType]();
}

// ------------ // Make Page Toggle 
function PageToggle(typePage){
    const pageType = {
        "profile":()=>{
            $(".onlineSection,.head").css({opacity: 0,"margin-top": 0,height: 0});
            $(".InboxPeople").css({opacity: 0,top: 0});
            $(".UserProfile").css({display:"block",position: "relative"});

            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".onlineSection,.InboxPeople").css({"display":"none"});
                $(".UserProfile").css({opacity: 1});
            },200);

            return "Profile Transition Success"
        },
        "friends":()=>{ 
            $(".onlineSection,.InboxPeople").css({"display":"block"});
            $(".UserProfile").css({opacity: 0,position: "absolute"});
            $(".onlinePeople").css({opacity: 0,"margin-top": 0,"max-height": "0px"});
            $(".Person").css({opacity: 1,"margin-bottom": 10,height: 70});
            
            
            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".UserProfile").css({"display":"none"});
                $(".onlineSection").css({opacity: 1,"margin-top": 20,height: 50});
                $(".head").css({height: 100,"padding-top": 5, opacity: 1});
                $(".InboxPeople").css({top: 10,opacity: 1});
            },200)

            return "FriendList Transition Success"
        },
        "inbox":()=>{
            $(".onlineSection,.InboxPeople").css({"display":"block"});
            $(".UserProfile").css({opacity: 0,position: "absolute"});
            $(".onlinePeople").css({opacity: 1,"margin-top": 20,"max-height": 80});
            $(".Person").css({opacity: 1,"margin-bottom": 10,height: 70});
            
            
            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".UserProfile").css({"display":"none"});
                $(".onlineSection").css({opacity: 1,"margin-top": 20,height: 140});
                $(".head").css({height: 100,"padding-top": 5, opacity: 1});
                $(".InboxPeople").css({top: 10,opacity: 1});
            },200)

            return "Inbox Transition Success"
        },
        "msgPerson":()=>{
            $(".UserProfile,.ShowInbox").css({display: "none"  })
            $(".messageMode,.messageMode-1,.messageMode-2").css({display: "flex"})
            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".messageMode,.messageMode-1,.messageMode-2").css({display: "flex"})
            },200)

            return "Inbox Transition Success"
        },
        "BackInbox":()=>{
            $(".ShowInbox").css({display: "block"})
            $(".messageMode,.messageMode-1,.messageMode-2,.UserProfile").css({display: "none"})
            
            // Work on css Transition finish
            // setTimeout(()=>{ 
            //     $(".messageMode,.messageMode-1,.messageMode-2").css({display: "flex"})
            // },200)

            return "Inbox Transition Success"
        },
        "loginPage":()=>{return null}
    }
    pageType[typePage]();
}