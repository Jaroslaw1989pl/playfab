// custom modules
const Database = require('../../app/database.class');

class ProjectList {

  constructor() {
    this.database = new Database();
  }

  getProjectList() {
    const query = "SELECT * FROM projects";
    return new Promise((resolve, reject) => {
      this.database.connection.query(query, (error, result, fields) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}

module.exports = ProjectList;