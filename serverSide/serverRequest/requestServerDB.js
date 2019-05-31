const privateMSG = require("./MSGDBHandler"),
      profileLoader = require("./ProfileAccountChanges"),
      serverDB = require("../ServerDB"),
      backupMSG = require("./BackDBHandler");

async function InitiateUser(userInfo){
    // serverDB(userInfo)
    // serverDB.setDataToDB
    
    // console.log(serverDB.setDataToDB(userInfo));

    return serverDB.setDataToDB(userInfo)
}


module.exports = {
    InitiateUser: InitiateUser
}