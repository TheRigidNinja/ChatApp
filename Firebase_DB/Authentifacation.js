const firebase = require("../node_modules/firebase");
const config = require("../config").config;
firebase.initializeApp(config);

async function AuthtoFirebase(LoginCredential){
    // ------------------------- //  Register 
    if(LoginCredential.newCustomer == true){    
        const promise = new Promise((resolve,reject)=>{
            firebase.auth().createUserWithEmailAndPassword(LoginCredential.email, LoginCredential.password)
            .then((userInfor) => {
                return resolve({
                    "State":"Registered",
                    "Msg": "You have successfully created a new account!",
                    "UserId": userInfor.user.uid,
                    "userName": LoginCredential,
                })

            }).catch((error)=> {
                return resolve({"State":"FailedRegistered","Msg":error.message})

            }).catch((error)=> {
                return error
            });
        })
        return promise

    }else{

        // ------------------------- //  Login 
        const promise = new Promise((resolve)=>{
            firebase.auth().signInWithEmailAndPassword(LoginCredential.email, LoginCredential.password).then((userInfor) => {

                return resolve({
                    "State":"Logined",
                    "Msg": "You successfully Logged In!",
                    "UserId": userInfor.user.uid,
                    "userName": LoginCredential.name,
                });

            }).catch((error)=> {

                return resolve({"State":"Fail_Login","Msg":error.message})
            });
        }).catch((error)=> {
            
            return error
        })

        return promise
    }
}


module.exports = {
    processLogin: AuthtoFirebase
}