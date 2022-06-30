// custom modules
const Editor = require('../models/parser/editor.class');
const ParserList = require('../models/parser/parser-list.class');


exports.parserList = (request, response, next) => {
  const form = new ParserList();
  form.filterParserList(request.body)
  .then(result => {
    request.session.parserList = result;
    response.redirect('/parser-list');
  })
  .catch(error => console.log('parser-controller => parserList()', error));
};

exports.parserDelete = (request, response, next) => {
  if (request.params.name) {

    const form = new Editor();
  
    form.deletFromDatabse(request.params.name)
    .then(() => {
      form.deleteFile(request.params.name);
    })
    .then(() => {
      response.redirect('/parser-list');
    })
    .catch(error => console.log('parser-controller => parserDelete()', error));
  }
};