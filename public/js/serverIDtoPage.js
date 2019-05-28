
function SetserverUserId(){
    let rand =  (Math.random()*1000).toString(16).substring();

    SetCookie("serverUserId",rand)
    
    return rand
}


function GetserverUserId(serverReturnID){
    return GetsCookie("serverUserId") == serverReturnID
}