const admin = require("../node_modules/firebase-admin");
const serviceAccount = require("../../adminsdk.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function WriteProfileToDB(userData){

    const promise = new Promise((resolve)=>{
        Object.keys(userData).forEach(element => {

            // Writes Private key to db for identification
            if(userData[element].newUser == true){
                db.collection(userData[element].userId).doc(userData[element].userName)
                .set({myName:userData[element].userName,Friends:{}});
            }

            userData[element].newUser = false;
            delete userData[element].userId;

            db.collection("UserProfile")
            .doc(element).set(userData[element]).then(()=>{
                resolve("Done!")
            })
        });
    }).catch((err)=>{})
    return await promise
}

// User Writes DATA
async function WriteMsgToDB(userData){
    let UserId = userData.UserId;

    const promise = new Promise((resolve)=>{
        // console.log("object")
        // db.collection("UserProfile").get().then(doc =>{
        //     console.log(doc._size)
        // })

        db.collection("UserProfile")
        .doc("User"+doc._size).set(userData).then(()=>{
            resolve("Done!")
        })
        
    })

    return await promise
}

// User massager loader
async function LoadMsgFromDB(userData){
    db.collection("Chat").get().then(doc =>{console.log(doc._size)})

    const promise = new Promise((resolve)=>{
        db.collection(userData.UserId).doc("User").get().then(doc =>{resolve(doc)});
    })

    return promise
}

// user profile infor handuler 
async function LoadUserInfo(userData){

    const promise = new Promise((resolve)=>{
        let docRef = db.collection("UserProfile");
        let collectionData = {};

        // Getting data for DB and returning to local DB
        docRef.get().then(snapshot =>{
            snapshot.forEach(doc => {
                var userName = doc.data().userName;
                collectionData[userName] = doc.data();
            });

            resolve(collectionData);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
 
            // docs("User1")
            // for(let i = 0; i < doc._size; i++){
            //     if (!doc.exists) {
            //         console.log('No such document!');
            //       } else {
            //         console.log(doc);
            //         resolve(doc.data())
            //     }
            // }

    })

    return promise
}



 async function defaultUser(loginData,userId){
    const promise = new Promise((resolve)=>{
        db.collection(userId).get().then(snapshot =>{
            snapshot.forEach(doc => {resolve(doc.data().myName)})
        });
    })

    return {...loginData,userName: await promise}
}

module.exports = {
    LoadMSG: LoadMsgFromDB,
    WriteToDB: WriteMsgToDB,
    WriteProfileToDB: WriteProfileToDB,
    LoadUserInfo: LoadUserInfo,
    defaultUser: defaultUser
}