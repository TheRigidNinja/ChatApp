


const  FakeRegisterDomElms=()=>{
    let eml = `<div class="userName" style="height: 0px">
        <input type="text" id="userLabel" style="height: 0px"></div>`

    return $(eml).appendTo(document.body);
}

const  FakeForm=()=>{
    let eml = `<img src="##" id="picture"><input type="checkbox" id="check1"><input id="userLabel">
    <input id="email" value="example@gmail.com"><input id="password" value="1234567">`
    
    return $(eml).appendTo(document.body);
}





// domManipulate
describe("Login Tests",()=>{

    describe("Register User Test",()=>{
        afterEach(()=>{$(".userName").remove()})

        // Faking a function
        getDomElms = FakeRegisterDomElms; 
        const CheckAction = RegisterBox();

        it("Should Check if checkbox can toggle userName option",async()=>{
            assert.equal(CheckAction.height,80,"Checkbox cannot hide -> height must be: 80px");
        })

        it("User field must have required after checked",async()=>{
            assert.equal(CheckAction.attr,"required");
        })
    })

    describe("Test on user Submition",()=>{
        afterEach(()=>{$("form").remove()})

         // Faking a function
        getDomElms = FakeForm; 
        const formActio = SubmitForm();

        // Submition test 
        it("Should have email and password before sending to server",()=>{
            console.log(formActio);
            // assert.equal(CheckAction.attr,"required");
        })

        // it("It should",()=>{
        //     assert.equal(CheckAction.attr,"required");
        // })

    });


});

// signs = "×"
// getElms = stub;
// assert.equal(Calculate(),8);

// describe("Reveal UserName on Checked",()=>{
//     it("Should Return \"height:0px  and height:80px\"",()=>{
//         assert.equal(Register().before,0)
//     });

// })


// sinon 