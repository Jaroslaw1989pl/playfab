// build-in modules
const fs = require('fs');
// custom modules
const { ROOT_DIR } = require('../../app/config/config');
const Database = require('../../app/database.class');


class Editor {

  constructor(parser) {
    this.database = new Database();
  }

  loadFromDatabase(name, id = null) {
    return new Promise((resolve, reject) => {
      const select = "SELECT * FROM parsers WHERE parser_id = ? OR parser_name = ?";
      const values = [id, name];
      this.database.connection.query(select, values, (error, result, fields) => {
        if (error) reject(error);
        else if (result.length > 0) resolve(result);
        else if (result.length === 0) resolve([]);
      });
    });
  }
  
  insertIntoDatabase(name) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO parsers (parser_name) VALUES (?)";
      let values = [name];
      this.database.connection.query(query, values, (error, result, fields) => {
        if (error) reject(error.message);
        else resolve({success: 'Parser saved in database.'});
      });
    });
  }

  updateInDatabase(id, name) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE parsers SET parser_name = ? WHERE parser_id = ?";
      let values = [name, id];
      this.database.connection.query(query, values, (error, result, fields) => {
        if (error) reject(error.message);
        else resolve({success: 'Parser saved in database.'});
      });
    });
  }
  
  deletFromDatabse(name) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM parsers WHERE parser_name = ?";
      this.database.connection.query(query, name, (error, result, fields) => {
        if (error) reject(error.message);
        else resolve({success: 'Parser deleted.'});
      });
    });
  }

  loadFromFile(name) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(ROOT_DIR + `/app/parsers/${name}.json`)) {
        fs.readFile(ROOT_DIR + `/app/parsers/${name}.json`, 'utf8', (error, data) => {
          if (error) reject(error);
          else resolve(data);
        });
      } else resolve('{"basic":{},"lists":{},"cards":{},"errors":{}}');
    });
  }

  saveInFile(parser) {
    return new Promise((resolve, reject) => {
      fs.writeFile(ROOT_DIR + `/app/parsers/${parser.basic.name}.json`, JSON.stringify(parser), (error) => {
        if (error) reject(error);
        else resolve({success: 'Parser saved.'});
      });
    });
  }

  deleteFile(name) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(ROOT_DIR + `/app/parsers/${name}.json`)) {
        fs.unlink(ROOT_DIR + `/app/parsers/${name}.json`, error => {
          if (error) console.log(error);
        });
      }
    });
  }
}

module.exports = Editor;