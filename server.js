const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express (); // Used for middleware to run app.use throughout the app

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Log the request first
app.use((req, res, next) => {
  var now = new Date().toString(); //toString creates a readable date format
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('Unable to append server.log')
      console.log(`${now}: ${req.method} ${req.url}`);
    }
  })
  next();
});

//then Check if we're in maintenance mode
app.use((req, res, next) => {
  res.render('maintenance.hbs', {
  maintMessage: 'Site currently being updated.'
  });
});

//Then run other requests
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/home', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to some website.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad',(req,res) => {
  res.send( {
      errorMessage: 'Unable to handle request'
  })
});

// App listening on port 3000
app.listen(3000, () =>{
  console.log('Server is up on port 3000');
});
