const privateMSG = require("./msgHandler"),
      profileLoader = require("./profileAccountChanges"),
      serverDB = require("../serverDB"),
      backupMSG = require("./backupDBHandler");

async function InitiateUser(userInfo){
    // serverDB(userInfo)
    // serverDB.setDataToDB
    
    // console.log(serverDB.setDataToDB(userInfo));

    return serverDB.setDataToDB(userInfo)
}


module.exports = {
    InitiateUser: InitiateUser
}