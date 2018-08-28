var rightEmail = 'test+carrier@saloodo.com';
var rightPassword = '123456';

var wrongEmail = 'wrong-email@saloodo.com';
var wrongPassword = 'wrong-password-123456';

var loginErrorMessage = `Either your email or password is not correct. Please ensure that you use your email address as 'Username' and try again. Alternatively, you can contact our support team at support@saloodo.com`;

module.exports = {
    'Validate that Saloodo login page displays correctly': function (browser) {
        browser
            .url('https://demo.saloodo.com/login')
            .waitForElementVisible('body', 1000)
            .assert
            .containsText('.login', 'Log in to Saloodo!');
    },

    'Validate that the Email field is visible to users': function (browser) {
        browser.expect.element('input[name=_email]').to.be.present;
        browser.expect.element('input[name=_email]').to.be.visible;
    },
    
    'Validate that the Password field is visible to users': function (browser) {
        browser.expect.element('input[name=_password]').to.be.present;
        browser.expect.element('input[name=_password]').to.be.visible;
    },
    
    'Validate that the LOG IN button is visible to users': function (browser) {
        browser.expect.element('button[type=submit]').to.be.present;
        browser.expect.element('button[type=submit]').to.be.visible;
    },
    
    'Validate that users are not allowed to submit an empty login form': function (browser) {
        browser
            .click('button[type=submit]')
            .waitForElementVisible('.field._email em', 500)
            .assert
            .containsText('.field._email em', 'This field cannot be empty')
            .assert
            .containsText('.field._password em', 'This field cannot be empty');
    },
    
    'Validate that Users are not able to submit the login form when only the user email is provided': function (browser) {
        browser
            .clearValue('input[name=_password]')
            .setValue('input[name=_email]', rightEmail)
            .click('button[type=submit]')
            .waitForElementVisible('.field._password em', 500)
            .assert
            .containsText('.field._password em', 'This field cannot be empty');
    },

    'Validate that Users are not able to submit the login form when only the user password is provided': function (browser) {
        browser
            .clearValue('input[name=_email]')
            .setValue('input[name=_password]', rightPassword)
            .click('button[type=submit]')
            .waitForElementVisible('.field._email em', 500)
            .assert
            .containsText('.field._email em', 'This field cannot be empty');
    },

    'Validate that an error message is displayed to users when attempting to login with a valid email - invalid password combination': function (browser) {
        browser
            .clearValue('input[name=_email]')
            .clearValue('input[name=_password]')
            .setValue('input[name=_email]', rightEmail)
            .setValue('input[name=_password]', wrongPassword)
            .click('button[type=submit]')
            .waitForElementVisible('.main.login .error-message', 2000)
            .assert
            .containsText('.main.login .error-message', loginErrorMessage);
    },
    
    'Validate that an error message is displayed to users when attempting to login with a invalid email - valid password combination': function (browser) {
        browser
            .clearValue('input[name=_email]')
            .clearValue('input[name=_password]')
            .setValue('input[name=_email]', wrongEmail)
            .setValue('input[name=_password]', rightPassword)
            .click('button[type=submit]')
            .waitForElementVisible('.main.login .error-message', 2000)
            .assert
            .containsText('.main.login .error-message', loginErrorMessage);
    },
    
    'Validate that users are not allowed to login successfully with invalid credentials': function (browser) {
        browser
            .clearValue('input[name=_email]')
            .clearValue('input[name=_password]')
            .setValue('input[name=_email]', wrongEmail)
            .setValue('input[name=_password]', wrongPassword)
            .click('button[type=submit]')
            .waitForElementVisible('.main.login .error-message', 2000)
            .assert
            .containsText('.main.login .error-message', loginErrorMessage);
    },
    
    'Validate that users can login successfully with valid credentials': function (browser) {
        browser
            .clearValue('input[name=_email]')
            .clearValue('input[name=_password]')
            .setValue('input[name=_email]', rightEmail)
            .setValue('input[name=_password]', rightPassword)
            .click('button[type=submit]')
            .pause(1000)
            .assert
            .urlEquals('https://demo.saloodo.com/dashboard')
            .end();
    }
};
