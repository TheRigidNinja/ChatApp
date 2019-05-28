msgDATABASE = {}

function msgLoader(msgKey){
    return msgDATABASE.msgKey?msgDATABASE.msgKey:false
}

function msgWriter(key,msg){
    msgDATABASE[key]={
        lastMsg:msg,
        date:"",
        [`Msg${new Date/1e3|0}`]:msg
    }
}


module.exports = {
    msgLoader: msgLoader,
    msgWriter: msgWriter
}
