const admin = require("../node_modules/firebase-admin");
const serviceAccount = require("../adminsdk.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function WriteProfileToDB(data){
    data.Msg = {"Requests":"?"}
    data.userName = data.userName.name;
    
    const promise = new Promise((resolve)=>{
        db.collection("UserProfile").get().then(doc =>{
            db.collection("UserProfile")
            .doc("User"+doc._size).set(data).then(()=>{
                resolve("Done!")
            })
        })
    })

    return await promise
}

// User Writes DATA
async function WriteMsgToDB(data){
    let UserId = data.UserId;

    const promise = new Promise((resolve)=>{
        console.log("object")
        db.collection("UserProfile").get().then(doc =>{
            console.log(doc._size)
        })

            // db.collection("UserProfile")
            // .doc("User"+doc._size).set(data).then(()=>{
            //     resolve("Done!")
            // })
        
    })

    return await promise
}

// User massager loader
async function LoadMsgFromDB(data){
    db.collection("Chat").get().then(doc =>{console.log(doc._size)})

    const promise = new Promise((resolve)=>{
        db.collection(data.UserId).doc("User").get().then(doc =>{resolve(doc)});
    })

    return promise
}

// user profile infor handuler 
async function LoadUserProfileInfo(data){
    // db.collection("Chat").get().then(doc =>{console.log(doc._size)})

    const promise = new Promise((resolve)=>{
        let docRef = db.collection("UserProfile").doc("User1")
        
        docRef.get().then(doc =>{
            if (!doc.exists) {
                console.log('No such document!');
              } else {
                resolve(doc.data())
              }
        });
    })

    return promise
}


module.exports = {
    LoadMSG: LoadMsgFromDB,
    WriteToDB: WriteMsgToDB,
    WriteProfileToDB: WriteProfileToDB,
    LoadUserInfo: LoadUserProfileInfo
}