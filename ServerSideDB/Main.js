const fireStoreHandler = require("../Firebase_DB/FireStoreHandler");


var userData = []


function NumOfOnlineUsers(){return userData.length}

async function InitiateUser(ProfileData){
    if (ProfileData.State === "Registered"){
        await fireStoreHandler.WriteProfileToDB(ProfileData)
        .then(()=>{
            ProfileData.State = "Online"
            userData.push(ProfileData);
        }).catch(err);

    }else if(ProfileData.State === "Logined"){
        await fireStoreHandler.LoadUserInfo(ProfileData)
        .then((res)=>{
            res.State = "Online"
            userData.push(res);   
        })
    }

    return userData
}

module.exports = {
    numOfPeople:NumOfOnlineUsers,
    InitiateUser:InitiateUser

}