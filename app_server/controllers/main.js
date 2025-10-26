// app_server/controllers/main.js
const render = (view, title) => (req, res) => res.render(view, { title });

module.exports = {
  index:   render('index',   'Travlr Getaways'),
  about:   render('about',   'About'),
  contact: render('contact', 'Contact'),
  meals:   render('meals',   'Meals'),
  news:    render('news',    'News'),
  rooms:   render('rooms',   'Rooms'),
};
