// custom modules
const Editor = require('../models/parser/editor.class');
const ParserList = require('../models/parser/parser-list.class');


exports.parserList = (request, response, next) => {
  const list = new ParserList();

  list.getParserList()
  .then(result => {
    let data = {
      html: {
        title: 'Playfab | Parsers list'
      },
      parser: request.session.parserList || result
    };

    request.session.parserList = undefined;

    response.render('parser-list.ejs', data);
  })
  .catch(error => console.log('views-parser => parserList()', error));
};

exports.parserEditor = (request, response, next) => {
  if (request.params.id) {

    const editor = new Editor();

    editor.loadFromDatabase('', request.params.id)
    .then(result => {
      return editor.loadFromFile(result[0].parser_name)
    })
    .then(file => {
      let data = {
        html: {
          title: 'Playfab | Parsers editor'
        },
        parser: JSON.parse(file)
      };
      response.render('parser-editor.ejs', data);
    })
    .catch(error => console.log('views-parser => parserEditor() > loading file', error));

  } else {

    let data = {
      html: {
        title: 'Playfab | Parsers editor'
      }
    };
    response.render('parser-editor.ejs', data);
  }
};

exports.parserListEditor = (request, response, next) => {
  if (request.params.id) {

    const editor = new Editor();

    editor.loadFromDatabase('', request.params.id)
    .then(result => {
      return editor.loadFromFile(result[0].parser_name)
    })
    .then(file => {
      let data = {
        html: {
          title: 'Playfab | Parsers lists editor'
        },
        parser: JSON.parse(file)
      };
      response.render('parser-list-editor.ejs', data);
    })
    .catch(error => console.log('views-parser => parserEditor() > loading file', error));

  } else {

    let data = {
      html: {
        title: 'Playfab | Parsers lists editor'
      }
    };
    response.render('parser-list-editor.ejs', data);
  }
};