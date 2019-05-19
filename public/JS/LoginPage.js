var socket = io();

// Getting started
function SubmitForm(e){
    e.preventDefault();
    const LoginCredential = validateData();

    if(LoginCredential != false){ 
       socket.emit("Login",LoginCredential); 
    }
}

// Changes page if user is valid
socket.on('LoginState', function(userLogin){
    WarningAlert(userLogin.Msg);

    // Change pages IF Successful
    if (["Logined","Registered"].includes(userLogin.state)){

        console.log(userLogin)
        setTimeout(()=>{
            // SetCookie
            SetCookie("userIdentifier",userLogin.UserId);
            SetCookie("userName",userLogin.userName);
            SetCookie("state",userLogin.state);
            SetCookie("picture",userLogin.picture);
            SetCookie("newUser",userLogin.newUser);
            window.location.replace("/chat");

            return true
        },3000);

    }else{return false}
})

function validateData(data = collectLoginData()){
    var warnings = "";
    if (data.password.replace(" ", "").length < 6){
        warnings+="Password must be > 6 char <br>";
    } 

    if (data.newCustomer == true && data.name.length < 4){
        warnings+="User Name must be > 4 char <br>"
    } 

    // Showing warnings to the user
    if(warnings != ""){
        WarningAlert(warnings);
        return false
    }else{
        // Finally passes login data only to server
        return data
    }
}


function collectLoginData(){
    var userLoginData = {
        name: $(":text").val(),
        email: $("#email").val(),
        password: $(":password").val(),
        newCustomer:$(":checkbox").is(":checked"),
        picture:null
    }
    return userLoginData;
}

function ToggleInput(){
    if (!$(":checkbox").is(":checked")){
        $(":text").prop("required", false)
        $(".userName")
        .animate({
            opacity: 0,
            height: 0
        },300);
    }else{
        $(":text").prop("required",true)
        $(".userName").animate({
            opacity: 1,
            height: 100
        },300);
    }
}

// Alerts warning to user
function WarningAlert(warnings){
    let color = warnings.indexOf("successfully") != -1?"green":"black"

    $("#Alert").html(warnings).css({
        "height":"90px",
        "background":color
    });

    setTimeout(() => {
        $("#Alert").html("").css("height","0px");
    }, 5000);
}

// Sets a cookie 
function SetCookie(cname,cvalue){
    let d = new Date(),
    expires = "expires="+ d.setTime(d.getTime() + (1*24*60*60*1000));

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    return "Success"
}
