const expect = require('chai').expect;
const sinon = require('sinon');

const mailUtils = require('./mail');
const User = require('../models/users');

afterEach(function (){
    sinon.restore();
});

describe("Password validation tests", function() {
    it("should return true if the password is correct",  function () {
        const testPass = "Qwerty123!"

        const result = mailUtils.validatePassword(testPass);

        expect(result).to.be.true;
    })
});