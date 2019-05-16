const admin = require("../node_modules/firebase-admin");
const serviceAccount = require("../../adminsdk.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function WriteProfileToDB(Userdata){
    console.log(Userdata);
    console.log("---------------");

    const promise = new Promise((resolve)=>{
        db.collection("UserProfile").get().then(doc =>{
            db.collection("UserProfile")
            .doc("User"+doc._size).set(Userdata).then(()=>{
                resolve("Done!")
            })
        })
    }).catch((err)=>{})

    return await promise
}

// User Writes DATA
async function WriteMsgToDB(Userdata){
    let UserId = Userdata.UserId;

    const promise = new Promise((resolve)=>{
        console.log("object")
        db.collection("UserProfile").get().then(doc =>{
            console.log(doc._size)
        })

        db.collection("UserProfile")
        .doc("User"+doc._size).set(Userdata).then(()=>{
            resolve("Done!")
        })
        
    })

    return await promise
}

// User massager loader
async function LoadMsgFromDB(Userdata){
    db.collection("Chat").get().then(doc =>{console.log(doc._size)})

    const promise = new Promise((resolve)=>{
        db.collection(Userdata.UserId).doc("User").get().then(doc =>{resolve(doc)});
    })

    return promise
}

// user profile infor handuler 
async function LoadUserProfileInfo(Userdata){
    // db.collection("Chat").get().then(doc =>{console.log(doc._size)})

    const promise = new Promise((resolve)=>{
        let docRef = db.collection("UserProfile");
        let collectionData = [];

        docRef.get().then(snapshot =>{
            snapshot.forEach(doc => {
                collectionData.push(doc.data())
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


module.exports = {
    LoadMSG: LoadMsgFromDB,
    WriteToDB: WriteMsgToDB,
    WriteProfileToDB: WriteProfileToDB,
    LoadUserInfo: LoadUserProfileInfo
}