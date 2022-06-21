// custom modules
const Database = require('./../app/database.class');


class Registration {

  // private fields
  #firstName;
  #lastName;
  #userEmail;
  #userPass;
  #passConf;

  // public fields
  isFormValid = true;
  errors = {
    firstName: '',
    lastName: '',
    userEmail: '',
    userPass: '',
    passConf: ''
  };

  constructor() {
    this.database = new Database();
  }

  setUserData(formData) {
    this.#firstName = formData.firstName;
    this.#lastName = formData.lastName;
    this.#userEmail = formData.userEmail;
    this.#userPass = formData.userPass;
    this.#passConf = formData.passConf;
  }

  // getUserName(userName) {
  //   const query = "SELECT user_name FROM registrated_users WHERE user_name = ?";
  //   return new Promise((resolve, reject) => {
  //     this.database.connection.query(query, userName, (error, result, fields) => {
  //       if (error) reject(error);
  //       else resolve(result);
  //     });
  //   });
  // }

  getUserEmail(userEmail) {
    const query = "SELECT user_email FROM registrated_users WHERE user_email = ?";
    return new Promise((resolve, reject) => {
      this.database.connection.query(query, userEmail, (error, result, fields) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  firstNameValidation() {
    try {
      if (this.#firstName.length === 0) throw 'Please enter your user name.';
      else if (/[^\w]/.test(this.#firstName)) throw 'The username can only contain Latin letters, numbers and underscore.';
      else if (this.#firstName.length < 3) throw 'The username should be at least 3 characters long.';
      else if (this.#firstName.length > 24) throw 'The username should not exceed 24 characters.';    
    } catch (error) {
      this.errors.firstName = error;
      this.isFormValid = false;
    }
  }

  lastNameValidation() {
    try {
      if (this.#lastName.length === 0) throw 'Please enter your user name.';
      else if (/[^\w]/.test(this.#lastName)) throw 'The username can only contain Latin letters, numbers and underscore.';
      else if (this.#lastName.length < 3) throw 'The username should be at least 3 characters long.';
      else if (this.#lastName.length > 24) throw 'The username should not exceed 24 characters.';    
    } catch (error) {
      this.errors.lastName = error;
      this.isFormValid = false;
    }
  }

  emailValidation() {
    
    const emailRegex = /^([\w]+[.|-]{0,1}[\w]+)+@([\w]+-{0,1}[\w]+\.)+[a-zA-Z]{2,3}$/i;

    try {
      if (this.#userEmail.length === 0) throw 'Please enter your email address.';
      else if (!emailRegex.test(this.#userEmail)) throw 'That\'s an invalid email.';
    } catch (error) {
      this.errors.userEmail = error;
      this.isFormValid = false;
    }
  };

  passValidation() {
    try {
      if (this.#userPass.length === 0) throw 'Please enter a password.';
      else if (this.#userPass.length < 3) throw 'Password does not meet requirements.';
      else if (/[^\w]/.test(this.#userPass)) throw 'Password does not meet requirements.';
    } catch (error) {
      this.errors.userPass = error;
      this.isFormValid = false;
    }
  }

  passConfirmation() {
    try {
      if (this.#passConf.length === 0) throw 'Please confirm the password.';
      else if (this.#passConf !== this.#userPass) throw 'Passwords are not the same.';
    } catch (error) {
      this.errors.passConf = error;
      this.isFormValid = false;
    }
  }
}

module.exports = Registration;