const express = require('express');

const parser = require ('body-parser');
const encodedparser = parser.urlencoded({extended: true});

const multer = require ('multer');
const uploadProcessor = multer({ dest: 'public/uploads/' });

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(encodedparser);

let posts = [];
let postIdCounter = 1;

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

app.listen(4000, () => {
    console.log("server has started at http://127.0.0.1:4000");
});