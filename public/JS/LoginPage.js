var socket = io();

socket.on('LoginState', function(state){

    $("#Alert").html(state.Msg).css("height","80px");

    setTimeout(() => {
        $("#Alert").html("").css("height","0px");

        // Change pages IF Successful
        if (["Logined","Registered"].includes(state.State)){
            window.location.replace("/chat?"+state.UserId.slice(0,15));
         }
    }, 3000);
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

    if (!/[^\s]/.test(data.name) && $(":checkbox").is(":checked") || !/[^\s]/.test(data.password)){
        warnings+="Make sure you don't use empty  char  * ";
    }
    if (data.name.replace(" ", "").length < 4 && $(":checkbox").is(":checked")){
        warnings+="Name MUST be > 4 char  * ";
    }

    if (data.password.replace(" ", "").length < 6){
        warnings+="Password must be > 6 char * ";
    }
    if (data.password.includes("1234")){
        warnings+="Password MUST NOT be sequential e.g: 1234 * "
    }
    if (data.name.includes("@")){
        warnings+="User Name should NOT contain email * "
    }  

    // Showing warnings to the user
    if(warnings != ""){
        $("#Alert").html(warnings).css("height","80px");
        setTimeout(() => {
            $("#Alert").html("").css("height","0px");
        }, 5000);

        console.log("Failed!")
        return false
    }else{
        warnings+="*User Name must be > 4 char"
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
    
    console.log("Yes");
}