const firebase = require("../node_modules/firebase");

const config = {
    apiKey: "AIzaSyBa292saQfeQuy-uSq0kur6Zu2UeUdmfuQ",
    authDomain: "chatapp-66db3.firebaseapp.com",
    databaseURL: "https://chatapp-66db3.firebaseio.com",
    projectId: "chatapp-66db3",
    storageBucket: "chatapp-66db3.appspot.com",
    messagingSenderId: "545363742777"
};

firebase.initializeApp(config);

async function AuthtoFirebase(LoginCredential){
    console.log(LoginCredential)
    // ------------------------- //  Register 
    if(LoginCredential.newCustomer == true){    
        const promise = new Promise((resolve,reject)=>{
            firebase.auth().createUserWithEmailAndPassword(LoginCredential.email, LoginCredential.password).then((userInfor) => {
                return resolve({
                    "State":"Registered",
                    "Msg": "You have successfully created a new account!",
                    "UserId": userInfor.user.uid,
                    "userName": LoginCredential
                })

            }).catch((error)=> {
                return resolve({"State":"FailedRegistered","Msg":error.message})

            }).catch((error)=> {
                return reject(error)
            });
        })
        return promise

    }else{

        // ------------------------- //  Login 
        const promise = new Promise((resolve,reject)=>{
            firebase.auth().signInWithEmailAndPassword(LoginCredential.email, LoginCredential.password).then((userInfor) => {

                return resolve({
                    "State":"Logined",
                    "Msg": "You successfully Logined In!",
                    "UserId": userInfor.user.uid,
                    "userName": LoginCredential.name
                })

            }).catch((error)=> {

                return resolve({"State":"Fail_Login","Msg":error.message})
            });
        }).catch((error)=> {
            
            return reject(error)
        })
        return promise
    }
}


module.exports = {
    processLogin: AuthtoFirebase
}