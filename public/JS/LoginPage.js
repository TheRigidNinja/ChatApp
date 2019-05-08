var socket = io();

socket.on('LoginState', function(state){
    WarningAlert(state.Msg)

    // Change pages IF Successful
    setTimeout(()=>{
        if (["Logined","Registered"].includes(state.State)){
            state.UserId = state.UserId.slice(state.UserId.length/2);
            socket.emit("LoadAccount",state);
            window.location.replace("/chat");
        }
    },3000)
    
})

// Getting started
function SubmitForm(e){
    e.preventDefault();
    const LoginCredential = validateData();

    if(LoginCredential != false){ 
       socket.emit("Login",LoginCredential); 
    }
}

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
        WarningAlert(warnings)
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