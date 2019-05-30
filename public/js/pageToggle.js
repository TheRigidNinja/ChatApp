function pageToggleInbox(toggleTo){
    // console.log(toggleTo);

}


function pageToggleToMsg(e){
    $(".MessagingArea").css({display:"block"});
    $(".inboxSection, .navFooter").css({display:"none"});

    // Trigger MSG load event
    let msgkey = $(e.target).closest('.Person').attr("data-UserID")||$(e.target).closest        ('.Onlineperson').attr("data-UserID"),
    myMsgKey = $(".story").attr("data-UserID");

    LoadMessages(msgkey+"|"+myMsgKey);

}