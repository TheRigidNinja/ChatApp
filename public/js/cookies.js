function SetCookie(cname,cvalue){
    let date = new Date(),
    expires = "expires="+ date.setTime(date.getTime() + (1*24*60*60*1000));

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    return "Success"
}


function GetsCookie(key){

    var re = new RegExp(key + "=([^;]+)");
    var value = re.exec(document.cookie);

    return (value != null) ? value[1]: null;
}