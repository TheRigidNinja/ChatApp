const fireStoreHandler = require("../Firebase_DB/FireStoreHandler");

var userData = [];

function NumOfOnlineUsers(){return userData.length}

// Sets data in the DB
function setDataToDB(userInfo){
    let  objId = userInfo.userName.replace(" ","");

    if (objId !== "" && userData[objId] === undefined){ 
        userData.push(
            userData[objId] = {
                Msg:{
                    Requests: "-",
                    LastTime:"-",
                    LastMsg:"-",
                },
                State: "-",
                UserName: objId,
                UserId: "-",
                Picture: "-"
            }
        )
    }

    // Assign values to database
    // for (let elm in userInfo){
    //     if(["Requests","LastTime","LastMsg"].includes(elm)){
    //         userData[objId].Msg.elm = userInfo.elm;
    //     }else if(["State","UserName","Picture","UserId"].includes(elm)){
    //         userData[objId][elm] = userInfo[elm];
    //     }
    // }

    return userData
}


// InitiateUser
async function InitiateUser(ProfileData){
    if (ProfileData.State === "Registered"){
        ProfileData.State = "Online";
        ProfileData.userName = ProfileData.userName.name;

         let Userdata = ServerDB.setDataToDB(ProfileData);

        await fireStoreHandler.WriteProfileToDB(Userdata)
        .then((res)=>{});

    }else if(ProfileData.State === "Logined"){
        await fireStoreHandler.LoadUserInfo(ProfileData)
        .then((res)=>{
            res.State = "Online"
            // ServerDB.setDataToDB(res); 
        })
    }

    return userData
}

module.exports = {
    numOfPeople:NumOfOnlineUsers,
    InitiateUser:InitiateUser,
    setDataToDB:setDataToDB
}