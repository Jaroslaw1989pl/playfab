// custom modules
const Editor = require('../models/parser/editor.class');


exports.saveBasic = (request, response, next) => {

  let parser;
  let basic = {
    id: request.body.parserId || '',
    name: request.body.parserName,
    proxy: request.body.proxy,
    userAgent: request.body.parserUserAgent ? request.body.parserUserAgent.split('[-]') : [],
    headers: [],
    code: request.body.parserIdeText
  }

  console.log('body =>', request.body);

  const form = new Editor();

  form.loadFromDatabase(basic.name)
  .then(result => {
    // save/update parser basics in database
    if (result.length > 0) form.updateInDatabase(result[0].parser_id, basic.name);
    else if (result.length === 0) form.insertIntoDatabase(basic.name);
  })
  .then(() => {
    // load parser from database to get parser id number
    return form.loadFromDatabase(basic.name);
  })
  .then(result => {
    basic.id = result[0].parser_id;
    return form.loadFromFile(basic.name);
  })
  .then(data => {
    parser = JSON.parse(data);
    parser.basic = basic;
    form.saveInFile(parser);
  })
  .then(result => {
    request.session.flash = result;
    response.redirect('/parser-editor/' + basic.id);
  })
  .catch(error => console.log('editor-controller.js => save ()', error));
};

exports.saveList = (request, response, next) => {

  // let parser;
  // let basic = {
  //   id: request.body.parserId || '',
  //   name: request.body.parserName,
  //   proxy: request.body.proxy,
  //   userAgent: request.body.parserUserAgent ? request.body.parserUserAgent.split('[-]') : [],
  //   headers: [],
  //   code: request.body.parserIdeText
  // }

  // console.log('body =>', request.body);

  // const form = new Editor();
  
  // form.loadFromDatabase(basic.name)
  // .then(result => {
  //   // save/update parser basics in database
  //   if (result.length > 0) form.updateInDatabase(result[0].parser_id, basic.name);
  //   else if (result.length === 0) form.insertIntoDatabase(basic.name);
  // })
  // .then(() => {
  //   // load parser from database to get parser id number
  //   return form.loadFromDatabase(basic.name);
  // })
  // .then(result => {
  //   basic.id = result[0].parser_id;
  //   return form.loadFromFile(basic.name);
  // })
  // .then(data => {
  //   parser = JSON.parse(data);
  //   parser.basic = basic;
  //   form.saveInFile(parser);
  // })
  // .then(result => {
  //   request.session.flash = result;
  //   response.redirect('/parser-editor/' + basic.id);
  // })
  // .catch(error => console.log('editor-controller.js => save ()', error));
};