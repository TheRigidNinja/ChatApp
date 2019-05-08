const auth = require("../Firebase_DB/Authentifacation"),
    assert = require('chai').assert;

describe("Authentification Test",()=>{

    it("Should return a promise For login",()=>{
        assert.equal(""+auth.processLogin({newCustomer: false}), "[object Promise]")
    });

    it("Should return a promise For Register",()=>{
        assert.equal(""+auth.processLogin({newCustomer: true}), "[object Promise]")
    });
})