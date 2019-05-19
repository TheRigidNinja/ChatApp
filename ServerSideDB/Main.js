const fireStoreHandler = require("../Firebase_DB/FireStoreHandler");

var userData = {};

function NumOfOnlineUsers(){return userData.length}

// Sets data in the DB
function setDataToDB(userInfo){

    // Assign values to database
    for (let objKey in userInfo){
        if (userData[objKey] === undefined){ 
            userData[objKey] = {
                state: "-",
                picture: "-",
                newUser: "-",
                userName: objKey,
                email: {
                    detail: "-",
                    lastUpdate: "-"
                },
                phone: {
                    detail: "-",
                    lastUpdate: "-"
                },
                nickName: {
                    detail: "-",
                    lastUpdate: "-"
                },
                story: {
                    picture: "-",
                    detail: "-",
                    date: "-"
                }
            }
        }

        for (let elm in userInfo[objKey]){
            let picture = userInfo[objKey][elm].picture,
            date = userInfo[objKey][elm].date,
            detail = userInfo[objKey][elm].detail,
            lastUpdate = userInfo[objKey][elm].lastUpdate;

            switch(true){
                case elm === "story":
                    userData[objKey][elm].detail = 
                    detail != undefined && detail.match(/ |-/g)?detail:userData[objKey][elm].detail;

                    userData[objKey][elm].picture = 
                    picture != undefined && picture.match(/ |-/g)?picture:userData[objKey][elm].picture;

                    userData[objKey][elm].date = 
                    date != undefined && date.match(/ |-/g)?date:userData[objKey][elm].date;
                    break;

                case elm === "nickName" || elm ===  "phone" || elm === "email":
                    userData[objKey][elm].detail = 
                    detail!= undefined && detail.match(/ |-/g)?detail:userData[objKey][elm].detail;

                    userData[objKey][elm].lastUpdate = 
                    lastUpdate != undefined && lastUpdate.match(/ |-/g)?lastUpdate:userData[objKey][elm].lastUpdate;
                    break;

                default:
                    if(typeof userInfo[objKey][elm] != "object"){
                        userData[objKey][elm] = userInfo[objKey][elm];
                    }
            }
        }
    }

    return userData
}

// InitiateUser
function InitiateUser(ProfileData){

    const promise = new Promise((resolve)=>{
        let keyName = Object.keys(ProfileData)[0];

        if (ProfileData[keyName].state === "Registered"){
            ProfileData[keyName].state = "Online";

            // Write data to DB
            let serverUserData = setDataToDB(ProfileData);

            fireStoreHandler.WriteProfileToDB(serverUserData)
            .then((res)=>{resolve(serverUserData)});

        }else if(ProfileData[keyName].state === "Logined"){
            fireStoreHandler.LoadUserInfo(ProfileData)
            .then((res)=>{
                // Write data to DB
                resolve(setDataToDB(res))
            })
        }
    }).catch((error)=>{});

    return promise
}

module.exports = {
    InitiateUser:InitiateUser,
    setDataToDB:setDataToDB
}
