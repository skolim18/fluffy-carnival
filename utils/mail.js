const config = require('../config');
const uniqid = require('uniqid');
const buildUrl = require('build-url');
const sgMail = require('@sendgrid/mail');

exports.validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

exports.validatePassword = pass => {
    var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    var validPassword = regExp.test(pass);
    return validPassword;
};

exports.sendActivationEmail = user => {
    user.guid = uniqid();

    const generatedURL = buildUrl('http://localhost:9090', {
        path: 'activate',
        queryParams: {
            guid: user.guid
        }
    });

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'activate@test.com',
        subject: 'Activation link',
        text: 'Click to activate your account',
        html: `<a href="${generatedURL}">Click</a> to activate your account`
    };
    sgMail.send(msg);
};

exports.sendResetPasswordEmail = user => {
    user.resetPasswordToken = uniqid();
    user.expirationTokenDate = Date.now();
    user.expirationTokenDate = user.expirationTokenDate.getTime() + 5*60*1000;

    const generatedURL = buildUrl('http://localhost:9090', {
        path: 'reset',
        queryParams: {
            token: user.resetPasswordToken
        }
    });

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'reset@test.com',
        subject: 'Reset link',
        text: 'Click to reset your password',
        html: `<a href="${generatedURL}">Click</a> to reset your password`
    };
    sgMail.send(msg);

};