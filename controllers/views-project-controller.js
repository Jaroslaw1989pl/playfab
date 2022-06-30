// custom modules
const ProjectList = require('../models/project/project-list.class');


exports.projectList = (request, response, next) => {
  const list = new ProjectList();

  list.getProjectList()
  .then(result => {
    let data = {
      html: {
        title: 'Playfab | Projects list'
      },
      project: request.session.projectList || result
    };

    request.session.projectList = undefined;

    response.render('project-list.ejs', data);
  })
  .catch(error => console.log('views-parser => projectList()', error));
};

exports.projectEditor = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | Project editor'
    }
  };
  response.render('project-editor.ejs', data);
};