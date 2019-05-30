var msgDATABASE = {}

async function msgThumbnail(msgKey){
    let Orientation = changeOrientation(msgKey);

    if(msgDATABASE[Orientation]){
        let msgThumbnail = msgDATABASE[Orientation];

        return{
            lastMsg: msgThumbnail.lastMsg,
            lastSender: msgThumbnail.lastSender,
            lastDate: msgThumbnail.lastDate
        }
    }else{
        return false
    }
}


async function msgLoader(msgKey){
    let Orientation = changeOrientation(msgKey);

    return msgDATABASE[Orientation]?msgDATABASE[Orientation]:false
}

async function msgWriter(MessageDetail,msgKey){
    let Orientation = changeOrientation(msgKey),
        timeStamp = Date.parse(new Date);
        userMSG = msgDATABASE[Orientation]?msgDATABASE[Orientation].MSG:"";

    msgDATABASE[Orientation]={
        ...msgDATABASE[Orientation],
        lastMsg: MessageDetail.msg,
        lastSender: MessageDetail.sender,
        lastDate: timeStamp,
        roomKey: Orientation,
        MSG:{
            ...userMSG,
            [`${timeStamp}`]:{
                msg:MessageDetail.msg,
                sender: MessageDetail.sender
            }
        }
    }

    return msgDATABASE[Orientation]?msgDATABASE[Orientation]:false
}

Date.parse(new Date)

function changeOrientation(msgKey){
    let keySplit1 = msgKey.split("|"),
        keySplit2 = keySplit1[1]+keySplit1[0],
        keyReplace = msgKey.replace(/\|/g,""),
        existingDBKey = "";

        // Tries to get a key if it exists in the DB
        if(msgDATABASE[keyReplace]){
            existingDBKey = keyReplace;
        }else if(msgDATABASE[keySplit2]){
            existingDBKey = keySplit2;
        }else{
            existingDBKey = keyReplace
        }

    return existingDBKey
}


module.exports = {
    msgLoader: msgLoader,
    msgWriter: msgWriter,
    msgThumbnail:msgThumbnail
}
