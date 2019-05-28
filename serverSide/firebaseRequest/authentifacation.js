const firebase = require("../../node_modules/firebase"),
      config = require("../../../config").config,
      firebaseDB = require("./fireBaseDB");

firebase.initializeApp(config);


// ------------------------- //  Register 
async function RegisterUser(LoginCredential){ 

    const promise = new Promise((resolve,reject)=>{
        firebase.auth().createUserWithEmailAndPassword(LoginCredential.email, LoginCredential.password)
        .then((userInfor) => {
            return resolve({
                "state":"Online",
                "Msg": "You have successfully created a new account!",
                "UserId": userInfor.user.uid,
                "userName": LoginCredential.name,
                "newUser": true,
            })

        }).catch((error)=> {
            return reject({"state":"FailedRegistered","Msg":error.message})
        })
    }).catch((error)=> {return error});

    return await promise
}


 // ------------------------- //  Login 
async function LoginUser(LoginCredential){

    console.log(LoginCredential)
    const promise = new Promise((resolve)=>{

        firebase.auth().signInWithEmailAndPassword(LoginCredential.email, LoginCredential.password).then((userInfor) => {
            return resolve({
                "state":"Online",
                "Msg": "You successfully Logged In!",
                "UserId": userInfor.user.uid,
                "userName": LoginCredential.userName,
                "newUser": false
            });
        }).catch((error)=> {
            return resolve({"state":"Fail_Login","Msg":error.message})
        });

    }).catch((error)=> {return error})

    // Sets user to online
    // await firebaseDB.defaultUser(loginData)       | Big problem try to solve it

    return await promise;
}


// Determine which function should be fired 
async function Determinants(LoginCredential){

    let  userAuth = null;

    if(LoginCredential.newCustomer == true){
        userAuth = RegisterUser(LoginCredential);
    }else{
        userAuth = LoginUser(LoginCredential);
    }

    return await userAuth
}

module.exports = {
    processLogin: Determinants
}