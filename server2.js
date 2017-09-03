const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials'); // for headers and footers
app.set('view engine', 'hbs'); // to use handlbars as a view engine

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('unable to append server.log');
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance Page',
    maintMessage: 'Site under maintenance'
  });
});

app.use(express.static(__dirname + '/public')); //to set a static directory for public files

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('home2.hbs', {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about2.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errMessage: 'Error handling request'
  });
});

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
