// custom modules
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
  let data = {
    html: {
      title: 'Playfab | Parsers editor'
    }
  };
  response.render('parser-editor.ejs', data);
};