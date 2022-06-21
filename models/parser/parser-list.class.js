// custom modules
const Database = require('./../../app/database.class');

class ParserList {

  constructor() {
    this.database = new Database();
  }

  getParserList() {
    const query = "SELECT * FROM parsers";
    return new Promise((resolve, reject) => {
      this.database.connection.query(query, (error, result, fields) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  filterParserList(formData) {
    const query = "SELECT * FROM parsers WHERE parser_name LIKE ?";
    const values = [
      '%' + formData.store + '%'
    ];
    return new Promise((resolve, reject) => {
      this.database.connection.query(query, values, (error, result, fields) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}

module.exports = ParserList;