/*** PUBLIC VIEWS ***/

exports.home = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | Home page'
    }
  };
  response.render('home.ejs', data);
};

exports.games = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | Games'
    }
  };
  response.render('games.ejs', data);
};

exports.gamesCheckers = (request, response, next) => {
  let data = {
    html: {
      title: 'Playfab | Checkers'
    }
  };
  request.session.referer = request.url;
  response.render('games-checkers.ejs', data);
};