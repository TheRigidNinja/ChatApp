var socket = io();

//  Handles Submit Action  
function SubmitForm(){

    let userLoginData = domManipulate("LoginDetail",
    ["#check1, #picture, #userLabel, #email, #password"]),
    isItValid = ValidateFormData(userLoginData);

    if(isItValid == true){
        socket.emit("Login",userLoginData,SetserverUserId()); 
    }
}


// Handles Server responses - If user is valid move them to inbox
socket.on('LoginState', function(userLogin,userServeKey){

    // Change pages IF Successful
    if(GetserverUserId(userServeKey) == true){
        if (userLogin.state == "Online"){
            SetCookie("userIdentifier",userLogin.UserId);
            SetCookie("userName",userLogin.userName);
            SetCookie("msgKey",userLogin.msgKey);
            SetCookie("state",userLogin.state);
            SetCookie("picture",userLogin.picture);
            SetCookie("newUser",userLogin.newUser);

            window.location.replace("/chat");

            return true
        }else{
            return domManipulate("Warning",["#Alert"],userLogin.Msg);
        }
    }
})



// Handles Check box toggle to allow user to register 
function RegisterBox(){
    let domeElm =  domManipulate("CheckBoxToggle",[".userName"]);

    if(domeElm.height == 0){
        $(domeElm.userName)
        .css({display: "block",opacity: 1,height: 80})
        .find("#userLabel").attr("required", "required");
    }else{
        $(domeElm.userName)
        .css({opacity: 0,height: 0})
        .find("#userLabel").removeAttr("required");
        setTimeout(()=>{$(domeElm.userName).css("display","none");},100);
    }

    // will return a value of changed height and required
    let checkedElm = $(domeElm.userName);
    return {
        height: checkedElm.height(),
        attr : checkedElm.find("#userLabel").attr("required")
    }
}


// Checks if everything is correct in the form before submiting
function ValidateFormData(fromData){
    var warnings = "";

    if (fromData.password.replace(" ", "").length < 6){
        warnings+="Password must be > 6 char|";
    } 

    if (fromData.newCustomer == true && fromData.userName.length < 4){
        warnings+="User Name must be > 4 char|";
    } 
    
    // Showing warnings to the user
    if(warnings != ""){
        return domManipulate("Warning",["#Alert"],warnings);
    }else{
        return true
    }

}