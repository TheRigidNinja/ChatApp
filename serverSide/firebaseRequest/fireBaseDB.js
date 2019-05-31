const admin = require("../../node_modules/firebase-admin/lib");
const serviceAccount = require("../../adminsdk.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function firebaseDB(){
    return 
}


// Loads every user that an accounts to the server
async function defaultUser(loginData){
    // console.log(db);
    const promise = new Promise((resolve)=>{
        resolve(loginData.UserId)
        db.collection(loginData.UserId).get()//.then(snapshot =>{
        //     snapshot.forEach(doc => {resolve(doc.data().myName)})
        // });
    }).catch((error)=> {
        return loginData.Msg = error
    });

    return await promise

    // return {...loginData,userName: await promise}
}

module.exports = {
    // LoadMSG: LoadMsgFromDB,
    // WriteToDB: WriteMsgToDB,
    // WriteProfileToDB: WriteProfileToDB,
    // LoadUserInfo: LoadUserInfo,
    defaultUser: defaultUser
}