module.exports = {
    'Saloodo login page should load correctly' : function (browser) {
      browser
        .url('https://demo.saloodo.com/login')
        .waitForElementVisible('body', 1000)
        .assert.containsText('.login', 'Log in to Saloodo!')
        .end();
    }
  };
