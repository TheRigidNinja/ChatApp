function getDomElms(elmTags){
    return document.querySelectorAll(elmTags);
}

function domManipulate(action,elmTags,data){
    const elms = getDomElms(elmTags[0]);

    switch(action){
        case "CheckBoxToggle":
            return  {
                userName:elms, 
                height: $(elms).height()
            }

        case "LoginDetail":
            let source = elms[0].src.toString();

            return{
                picture:"../"+source.slice(source.indexOf("public")),
                newCustomer:elms[1].checked,
                userName:elms[2].value,
                email:elms[3].value,
                password:elms[4].value,
            }

        case "Warning":
            $(elms).html(data.replace(/\|/g,"<br>")).css("padding","20px");

            // Warning timeout
            setTimeout(() => {
                 $(elms).html("").css("padding","0px");
            }, 5000);

            return false

        case "GetOnlinePeople":

            return 0

        default: 
            return "We don't have that action"   
    }
}
