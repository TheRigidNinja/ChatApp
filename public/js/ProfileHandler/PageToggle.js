function pageToggleInbox(toggleTo){
    // console.log(toggleTo);
}



function pageToggleToMsg(e,actionType){

    if(actionType === "backToInbox"){
        $(".MessagingArea").css({display:"none"});
        // $(".inboxSection, .navFooter").css({display:"block"});
    }else{
        $(".MessagingArea").css({display:"block"});
        // $(".inboxSection, .navFooter").css({display:"none"});
    
        // Trigger MSG load event
        let msgkey = $(e.target).closest('.Person').attr("data-UserID")||$(e.target).closest        ('.Onlineperson').attr("data-UserID"),
        myMsgKey = $(".story").attr("data-UserID");
    
        LoadMessages(msgkey+"|"+myMsgKey);
    }
}