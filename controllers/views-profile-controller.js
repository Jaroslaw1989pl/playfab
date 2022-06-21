// custom modules
const EmailUpdate = require('../models/settings-email.class');
const BirthdayUpdate = require('../models/settings-birthday.class');
const NameUpdate = require('../models/settings-name.class');
const DeleteUser = require('../models/auth-delete.class');
// const NewPassword = require('../models/auth-new-password.class');
const PasswordUpdate = require('../models/settings-password');


/*** PROTECTED ROUTES ***/

/*** USER PROFILE ***/

/*** USER PROFILE SETTINGS ***/

exports.profileSettings = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | Profile settings'
    },
    errors: request.session.errors
  };
  
  request.session.errors = undefined;
  
  response.render('profile-settings.ejs', data);
};

exports.profileName = (request, response, next) => {
  const form = new NameUpdate();

  form.getLastUpdate(response.locals.user.id)
  .then(result => {
    let data = {
      html: {
        title: 'Playfab | Change name'
      },
      isUpdateAvailable: result[0].name_update + 60/*3600000 * 24 * 14*/ > parseInt(Date.now() / 1000) ? false : true,
      inputs: request.session.inputs || {
          firstName: response.locals.user.firstName, 
          lastName: response.locals.user.lastName
        },
      errors: request.session.errors
    };
    
    request.session.inputs = undefined;
    request.session.errors = undefined;
  
    response.render('profile-name.ejs', data);
  })
  .catch(error => console.log(error));
};

exports.profileBirthday = (request, response, next) => {
  const form = new BirthdayUpdate();
  form.getLastUpdate(response.locals.user.id)
  .then(result => {
    let data = {
      html: {
        title: 'Playfab | User birthday'
      },
      isUpdateAvailable: false,
      isRemoveAvailable: false,
      errors: request.session.errors
    };
    if (result[0].birthday_update === null || result[0].birthday_update + 60/*3600000 * 24 * 14*/ < parseInt(Date.now() / 1000)) {
      // birth date update is available
      data.isUpdateAvailable = true;
    }
    if (result[0].birthday !== null && data.isUpdateAvailable === false) {
      // birth date remove is available
      data.isRemoveAvailable = true;
    }

    request.session.errors = undefined;
    
    response.render('profile-birthday.ejs', data);
  })
  .catch(error => console.log(error));
};

exports.profileEmail = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | User email'
    },
    isUpdateAvailable: false,
    isEmailSent: false,
    errors: request.session.errors,
    inputs: request.session.inputs
  };

  request.session.inputs = undefined;
  request.session.errors = undefined;

  // 1. Is 14 days passed since last update
  const form = new EmailUpdate(response.locals.user);
  form.getLastUpdate()
  .then(result => {
    if (result[0].email_update + 60/*3600000 * 24 * 14*/ < parseInt(Date.now() / 1000)) {
      // form.deleteCode();
      data.isUpdateAvailable = true;
    }
    // 2. Is code was send (code exists in the database)
    return form.checkStep();
  })
  .then(result => {
    if (result.length > 0) data.isEmailSent = true;
    response.render('profile-email.ejs', data);
  })
  .catch(error => console.log('views-controller.js => profileEmail() > getLastUpdate()', error));
};

exports.profilePassword = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | Update password'
    },
    isUpdateAvailable: false,
    isEmailSent: false,
    errors: request.session.errors,
    inputs: request.session.inputs
  };

  request.session.inputs = undefined;
  request.session.errors = undefined;

  // 1. Is 14 days passed since last update
  const form = new PasswordUpdate(response.locals.user);
  form.getLastUpdate()
  .then(result => {
    if (result[0].password_update + 60/*3600000 * 24 * 14*/ < parseInt(Date.now() / 1000)) {
      // form.deleteCode();
      data.isUpdateAvailable = true;
    }
    // 2. Is code was send (code exists in the database)
    return form.checkStep();
  })
  .then(result => {
    if (result.length > 0) data.isEmailSent = true;
    response.render('profile-password.ejs', data);
  })
  .catch(error => console.log('views-controller.js => profileEmail() > getLastUpdate()', error));
};

/*** USER PROFILE DELETE ***/

exports.profileDelete = (request, response, next) => {
  const form = new DeleteUser(response.locals.user);
  form.checkStep()
  .then(result => {
    if (result.length === 0 || result[0].expire_date < parseInt(Date.now() / 1000)) {
      // deleting old code id date expires
      form.deleteCode();
      let data = {
        html: {
          title: 'Playfab | Profile delete'
        },
        isEmailSent: false
      };

      request.session.isCodeCorrect = undefined;
      
      response.render('profile-delete.ejs', data);

    } else {
      let data = {
        html: {
          title: 'Playfab | Profile delete'
        },
        inputs: request.session.inputs,
        errors: request.session.errors,
        isEmailSent: true
      };
      if (request.session.isCodeCorrect === true) data.isCodeCorrect = true;

      request.session.inputs = undefined;
      request.session.errors = undefined;

      response.render('profile-delete.ejs', data);
    }
  })
  .catch(error => console.log('profile delete form', error));
};