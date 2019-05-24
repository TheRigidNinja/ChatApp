const firebase = require("../node_modules/firebase");
const config = require("../config").config;
const fireStoreHandler = require("./FireStoreHandler");
firebase.initializeApp(config);

async function AuthtoFirebase(LoginCredential){
    // ------------------------- //  Register 
    if(LoginCredential.newCustomer == true){    
        const promise = new Promise((resolve,reject)=>{
            firebase.auth().createUserWithEmailAndPassword(LoginCredential.email, LoginCredential.password)
            .then((userInfor) => {
                return resolve({
                    "state":"Registered",
                    "Msg": "You have successfully created a new account!",
                    "UserId": userInfor.user.uid,
                    "userName": LoginCredential.name,
                    "newUser": true,
                })

            }).catch((error)=> {
                return reject({"State":"FailedRegistered","Msg":error.message})
            })
        }).catch((error)=> {return error});
        return promise

    }else{

        // ------------------------- //  Login 
        const promise1 = new Promise((resolve)=>{
            firebase.auth().signInWithEmailAndPassword(LoginCredential.email, LoginCredential.password).then((userInfor) => {
                return resolve({
                    "state":"Logined",
                    "Msg": "You successfully Logged In!",
                    "UserId": userInfor.user.uid,
                    "userName": "--",
                    "newUser": false
                });
            }).catch((error)=> {
                return resolve({"State":"Fail_Login","Msg":error.message})
            });
        }).catch((error)=> {return error})

        let loginData = await promise1;
        
        return await fireStoreHandler.defaultUser(loginData,loginData.UserId)
    }
}

module.exports = {
    processLogin: AuthtoFirebase
}