const express = require('express');

const parser = require ('body-parser');
const encodedparser = parser.urlencoded({extended: true});

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(encodedparser);

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/projects', (request, response) => {
    response.render('projects');
});

app.get('/play', (request, response) => {
    response.render('play');
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

app.get('/projects/everstream', (request, response) => {
    response.render('projects/everstream');
});

app.get('/projects/games', (request, response) => {
    response.render('projects/games');
});

app.get('/projects/orangobranding', (request, response) => {
    response.render('projects/orangobranding');
});

app.get('/projects/albertplus', (request, response) => {
    response.render('projects/albertplus');
});

app.get('/projects/wechatchannels', (request, response) => {
    response.render('projects/wechatchannels');
});

// Only listen if not in Vercel environment
if (require.main === module) {
    app.listen(4000, () => {
        console.log("server has started at http://127.0.0.1:4000");
    });
}