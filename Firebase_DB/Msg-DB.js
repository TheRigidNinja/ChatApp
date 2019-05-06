const admin = require("firebase-admin");
const serviceAccount = require("../../adminsdk.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



// User Writes DATA
async function WriteToDB(){

    // db.collection("User").doc("Si16a7hrsB4yn5a2ni 3a").get().then(doc =>{
    //     console.log(doc)
    // })
    
    // const keyValue = data.key
    // delete data.key
    // const promise = new Promise((resolve,reject,)=>{
    //     // db.collection("User").doc(keyValue).set(data).then(()=>{
    //     //     resolve(["Done!",keyValue])
    //     // })
    // })

}


// User Requests DATA
async function LoadFromDB(){


}


async function DistributeActions(data){
    // switch(true){
    //     case (data[0] == "Auth"):
    //         return await AuthtoFirebase(data[1])

    //     case data[0] == "UserWriteData":
    //         return await WriteToDB() 

    //     case data[0] == "UserNeedData": 
    //         return await LoadFromDB() 
        
    //     default:
    //         return "Theres No Command"
    // }
}

module.exports = {
    LoadMSG: DistributeActions
}