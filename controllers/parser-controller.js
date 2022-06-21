// custom modules
const ParserList = require("../models/parser/parser-list.class");


exports.parserList = (request, response, next) => {
  const form = new ParserList();
  form.filterParserList(request.body)
  .then(result => {
    request.session.parserList = result;
    response.redirect('/parser-list');
  })
  .catch(error => console.log('parser-controller => parserList()', error));
};