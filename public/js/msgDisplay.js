var writemsgKey = null;

function LoadMessages(msgKey){
    socket.emit("PrivateMessagingLine",{actionType:"Get"},msgKey,SetserverUserId());
    writemsgKey = msgKey;
    
    socket.on("PrivateMessagingLine",(msg,userServeKey)=>{
        if(GetserverUserId(userServeKey) == true){
            DisplayMSG(msg);
        }
    });
}



function WriteMessages(event){
    let userMsg = $("#MSGBox").val();

    socket.emit("PrivateMessagingLine",{
        actionType: "Set",
        userMsg: userMsg
    },writemsgKey,SetserverUserId());

    DisplayMSG(userMsg);

    return true
}


// if(GetserverUserId(userServeKey) == true){
    // SetserverUserId()

function DisplayMSG(msg){

    console.log(msg);

}