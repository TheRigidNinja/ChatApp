var writemsgKey = null;

function LoadMessages(msgKey,type){
    socket.emit("PrivateMessagingLine",{actionType:"Get"},msgKey,SetserverUserId());
    writemsgKey = msgKey;
    
    socket.on("PrivateMessagingLine",(MessageDetail,userServeKey)=>{
        // if(GetserverUserId(userServeKey) == true){}
            DisplayMSG(MessageDetail,msgKey,GetsCookie("userName"));
        
    });
}


function WriteMessages(){
    let userMsg = $(".MSGBox").find("textarea");

    if(userMsg != ""){
        socket.emit("PrivateMessagingLine",{
            actionType: "Set",
            MessageDetail: {
                msg:userMsg.val(),
                sender:GetsCookie("userName")
            }
        },writemsgKey,SetserverUserId());
    }

    userMsg.val("")

    return true
}


// if(GetserverUserId(userServeKey) == true){
    // SetserverUserId()

function DisplayMSG(MessageDetail,msgKey,userName){

    let listMSG = "";
    CheckLogins(); // Remove this

    if(MessageDetail != false && changeOrientation(MessageDetail,msgKey)){

        for(let elm  in MessageDetail.MSG){
            let classType = userName == MessageDetail.MSG[elm].sender?"sentMessage":"replyMessage",
            timeStamp = (new Date(Number(elm)).toGMTString()).slice(0,11);
            userIcon = classType == "replyMessage" ?`<img src="../public/img/User.svg" id="userIcon"></img>`:"";
            
            listMSG+=`<li class="${classType}"><time>${timeStamp}</time><div>${userIcon}<label>${MessageDetail.MSG[elm].sender}</label><p>${MessageDetail.MSG[elm].msg}</p></div></li>`
        };

        $(".msgDashboard").empty();
        $(listMSG).appendTo(".msgDashboard");
    }
}

function changeOrientation(userMsg,msgKey){

    let keySplit1 = msgKey.split("|"),
        keySplit2 = keySplit1[1]+keySplit1[0],
        keyReplace = msgKey.replace(/\|/g,"");

    return userMsg.roomKey === keyReplace||userMsg.roomKey === keySplit2
}