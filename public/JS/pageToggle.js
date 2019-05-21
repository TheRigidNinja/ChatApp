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
            $(".ShowInbox, .head").css({opacity: 0});
            $(".UserProfile").css({display:"block",position:"absolute"});

            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".ShowInbox").css({display:"none"});
                $(".UserProfile").css({opacity: 1,position:"relative"});
                $(".head").css({height: 0});
            },30);

            return "Profile Transition Success"
        },
        "friends":()=>{ 
            $(".ShowInbox").css({display:"block"});
            $(".UserProfile").css({opacity: 0,position:"absolute"});
            $(".head").css({height: 100});
            $(".onlinePeople").css({opacity: 0,height: 0});
            
            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".ShowInbox, .head").css({opacity: 1});
                $(".UserProfile").css({display:"none",position:"relative"});
            },30)

            return "FriendList Transition Success"
        },
        "inbox":()=>{
            $(".ShowInbox").css({display:"block"});
            $(".UserProfile").css({opacity: 0,position:"absolute"});
            $(".head").css({height: 100});
            $(".onlinePeople").css({opacity: 1,height: 70});
            
            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".ShowInbox, .head").css({opacity: 1});
                $(".UserProfile").css({display:"none",position:"relative"});
            },30)

            return "Inbox Transition Success"
        },
        "msgPerson":()=>{
            $(".UserProfile,.ShowInbox,.toolBAR").css({opacity: 0 });

            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".messageMode,.messageMode-1,.messageMode-2").css({display: "flex",opacity: 1});
                $(".UserProfile,.ShowInbox,.toolBAR").css({display: "none"})
            },150)

            return "Inbox Transition Success"
        },
        "BackInbox":()=>{
            $(".messageMode,.messageMode-1,.messageMode-2").css({display: "none",opacity: 0});
            $(".ShowInbox,.toolBAR").css({display: "block"})
    
            // Work on css Transition finish
            setTimeout(()=>{ 
                $(".UserProfile,.ShowInbox,.toolBAR").css({opacity: 1});
            },100)

            return "Inbox Transition Success"
        },
        "loginPage":()=>{return null}
    }
    pageType[typePage]();
}