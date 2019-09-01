const config = require('../config');
const uniqid = require('uniqid');
const buildUrl = require('build-url');
const sgMail = require('@sendgrid/mail');

exports.validatePassword = pass => {
    var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    var validPassword = regExp.test(pass);
    return validPassword;
};

exports.sendActivationEmail = user => {
    user.guid = uniqid();

    const generatedURL = buildUrl('http://localhost:9090', {
        path: 'user/activate',
        queryParams: {
            guid: user.guid
        }
    });

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'fluffycarnival@fluffy.com',
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
        path: 'user/reset',
        queryParams: {
            token: user.resetPasswordToken
        }
    });

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'fluffycarnival@fluffy.com',
        subject: 'Reset link',
        text: 'Click to reset your password',
        html: `<a href="${generatedURL}">Click</a> to reset your password`
    };
    sgMail.send(msg);

};

exports.sendInvitiationEmail = user => {
    inviteToken = uniqid();
    
    const generatedURLaccept = buildUrl('http://localhost:9090', {
        path: 'friends/accept',
        queryParams: {
            inviteToken: inviteToken
        }
    });

    const generatedURLdecline= buildUrl('http://localhost:9090', {
        path: 'friends/decline',
        queryParams: {
            inviteToken: inviteToken
        }
    });


//    sgMail.setApiKey(config.SENDGRID_API_KEY);
//    const msg = {
//        to: user.email,
//        from: 'fluffycarnival@fluffy.com',
//        subject: 'Friend request on Fluffy Carnival',
//        text: 'Click to accept invitiation',
//        html: `<a href="${generatedURLaccept}">Click</a> to accept invitiation. <a href="${generatedURLdecline}">Click</a> to decline invitiation. `
//    };
//    sgMail.send(msg);
};

exports.requestAccepted = user => {

    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'fluffycarnival@fluffy.com',
        subject: 'New friend on Fluffy Carnival',
        text: 'You have a new friend on Fluffy Carnival',
        html: `${user.name} ${user.surname} is your new friend`
    };
    sgMail.send(msg);
};
