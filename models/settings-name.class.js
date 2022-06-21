// custom modules
const Database = require('../app/database.class');

class NameUpdate {

  // private fields
  #userId;
  #firstName;
  #lastName;
  // #gold;
  // #isPriceAccepted;

  // public fields
  isFormValid = true;
  errors = {
    firstName: '',
    lastName: ''
    // price: ''
  };

  constructor() {
    this.database = new Database();
  }

  setUserData(formData) {
    this.#userId = formData.userId;
    this.#firstName = formData.firstName;
    this.#lastName = formData.lastName;
    // this.#gold = formData.gold;
    // this.#isPriceAccepted = formData.isPriceAccepted;
  }

  getLastUpdate(userId) {
    const query = "SELECT name_update FROM registrated_users WHERE user_id = ?";
    return new Promise((resolve, reject) => {
      this.database.connection.query(query, userId, (error, result, fields) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  // getUserName() {
  //   const query = "SELECT user_name FROM registrated_users WHERE user_name = ?";
  //   return new Promise((resolve, reject) => {
  //     this.database.connection.query(query, this.#newName, (error, result, fields) => {
  //       if (error) reject(error);
  //       else resolve(result);
  //     });
  //   });
  // }

  firstNameValidation() {
    try {
      if (this.#firstName.length === 0) throw 'Please enter your user name.';
      else if (/[^\w]/.test(this.#firstName)) throw 'The username can only contain Latin letters, numbers and underscore.';
      else if (this.#firstName.length < 3) throw 'The username should be at least 3 characters long.';
      else if (this.#firstName.length > 24) throw 'The username should not exceed 24 characters.';
      // return true;
    } catch (error) {
      this.errors.firstName = error;
      this.isFormValid = false;
      // return false;
    }
  }
  
  lastNameValidation() {
    try {
      if (this.#lastName.length === 0) throw 'Please enter your user name.';
      else if (/[^\w]/.test(this.#lastName)) throw 'The username can only contain Latin letters, numbers and underscore.';
      else if (this.#lastName.length < 3) throw 'The username should be at least 3 characters long.';
      else if (this.#lastName.length > 24) throw 'The username should not exceed 24 characters.';
      // return true;
    } catch (error) {
      this.errors.lastName = error;
      this.isFormValid = false;
      // return false;
    }
  }

  // formValidation() {
  //   try {
  //     if (this.#gold < 100) throw 'You do not have enough gold.';
  //     else if (this.#isPriceAccepted === false) throw 'You must accept pice.';
  //     return true;
  //   } catch (error) {
  //     this.errors.price = error;
  //     // this.isFormValid = false;
  //     return false;
  //   }
  // }

  nameUpdate() {
    const query = "UPDATE registrated_users SET first_name = ?, last_name = ?, name_update = ? WHERE user_id = ?";
    const values = [
      this.#firstName,
      this.#lastName,
      parseInt(Date.now() / 1000),
      this.#userId
    ];
    return new Promise((resolve, reject) => {
      this.database.connection.query(query, values, (error, result, fields) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  // spaceUpdate() {
  //   if (fs.existsSync('spaces/' + this.#oldName)) {
  //     fs.rename('spaces/' + this.#oldName, 'spaces/' + this.#newName, () => console.log('User space name changed.'));
  //   }
  // }

  // goldUpdate() {
  //   const query = "UPDATE users_profiles SET gold = ? WHERE user_id = ?";
  //   const values = [this.#gold - 100, this.#userId];
  //   return new Promise((resolve, reject) => {
  //     this.database.connection.query(query, values, (error, result, fields) => {
  //       if (error) reject(error);
  //       else resolve(result);
  //     });
  //   });
  // }
}

module.exports = NameUpdate;