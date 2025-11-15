const express = require('express');
const parser = require('body-parser');
const encodedparser = parser.urlencoded({extended: true});
const multer = require('multer');
const path = require('path');

const app = express();

// Set views directory
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(encodedparser);

// Routes
app.get('/', (request, response) => {
    response.render('index');
});

app.get('/projects', (request, response) => {
    response.render('projects');
});

app.get('/play', (request, response) => {
    response.render('play');
});

app.get('/games', (request, response) => {
    response.render('games');
});

app.get('/about', (request, response) => {
    response.render('about');
});

// Individual project pages
app.get('/projects/intertabs', (request, response) => {
    response.render('projects/intertabs');
});

app.get('/projects/paletteu', (request, response) => {
    response.render('projects/paletteu');
});

app.get('/projects/mbtiidealpartner', (request, response) => {
    response.render('projects/mbtiidealpartner');
});

app.get('/projects/games', (request, response) => {
    response.render('projects/games');
});

// Export the app for Vercel
module.exports = app;

