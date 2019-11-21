const path = require('path');

// Configuring and Setting up the server Application `app`
const express = require('express');

const app = express();

// Adding pug/jade as the view engine for templating response pages
app.set('view engine','pug');

// Setting the `views` folder for storing dynamic views
app.set('views', 'views');

//Setting Up seperate Routes for processing request
const clientRoute = require('./routes/client');
const searchRoute = require('./routes/search');

// Configuing and Hosting Server Port
const port = process.env.PORT || 10000;
console.log(`Server Running at http://localhost:${port}/`);

// Adding the public directory for client read actions
app.use(express.static(path.join(__dirname, 'public')));

// Filter Request URL accordingly
app.use(searchRoute);
app.use(clientRoute);

// Handling Not Processed URLs
app.use((req, res, next) => {
    res.status(404).render('error',{'url': req.url});
});

// Deploying Server
app.listen(port);