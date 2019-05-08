const DB = require("../ServerSideDB/Main"),
    assert = require('chai').assert;

describe("Server Test",()=>{

    it("On Main.js it Should return A promise object --> Registered",()=>{
        assert.equal(""+DB.InitiateUser({State:"Registered"}), "[object Promise]")
    });

    it("On Main.js it Should return A promise object --> Logined",()=>{
        assert.equal(""+DB.InitiateUser({State:"Logined"}), "[object Promise]")
    });
})