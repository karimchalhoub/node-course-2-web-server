const express = require('express');
const hbs = require('hbs'); //for Handlebars view engine
const fs = require('fs'); //for file system commands and functions

const port = process.env.PORT || 3000; //to let Heroku define port otherwise 3000 locally
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

// uncomment if in maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//   maintMessage: 'Site currently being updated.'
//   });
// });

//run public
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
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

app.get('/projects', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('projects.hbs',{
    pageTitle: 'Projects',
    welcomeMessage: 'My Portfolio.'
  });
});

app.get('/bad',(req,res) => {
  res.send( {
      errorMessage: 'Unable to handle request'
  })
});

// App listening on var port
app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
