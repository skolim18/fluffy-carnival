const expect = require('chai').expect;
const sinon = require('sinon');

const userControllers = require('./usercontrollers');
const User = require('../models/users');

afterEach(function (){
    sinon.restore();
});

describe("Email validation tests", function() {
    it("should return true if the email is correct",  function () {
        const testEmail = "test@test.com"

        const result = userControllers.validateEmail(testEmail);

        expect(result).to.be.true;
    })
});