const DB = require("../ServerSideDB/Main"),
    assert = require('chai').assert;

// Testing local Database
describe("Server DataBase",()=>{
    const userNameT = DB.setDataToDB({"TestStore":{
        state: "Offline",
        phone: {detail:"Sample Test"},
        email: {detail:"Sample Test"},
        nickName: {detail:"Sample Test"},
        story: {detail:"Sample Test"}
    }});

    it("Should expect \"TestStore\" to be in the \"userName\"",()=>{
        assert.equal(userNameT["TestStore"].userName,"TestStore");
    });

    it("Should expect data in phone",()=>{
        assert.equal(userNameT["TestStore"].phone.detail,"Sample Test");
    });

    it("Should expect data in email",()=>{
        assert.equal(userNameT["TestStore"].email.detail,"Sample Test");
    });

    it("Should expect data in nickName",()=>{
        assert.equal(userNameT["TestStore"].nickName.detail,"Sample Test");
    });
    
    it("Should expect data in story",()=>{
        assert.equal(userNameT["TestStore"].story.detail,"Sample Test");
    })
})


// Testing server writing and loading data from firebase DB
describe("Server Loading Data Test",()=>{

    it("On Main.js it Should return A promise object --> Registered",()=>{
        assert.equal(""+DB.InitiateUser({State:"Registered"}), "[object Promise]")
    });

    it("On Main.js it Should return A promise object --> Logined",()=>{
        assert.equal(""+DB.InitiateUser({State:"Logined"}), "[object Promise]")
    });
})