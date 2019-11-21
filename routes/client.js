const path = require('path');

const express = require('express');

//Setting up a RouteHandler `router` for request processing
const router = express.Router();

// Filtering only GET requests for processing
router.get('/',(req, res, next) => {
    // Rendering the pug template file `index` for Client 
    res.render('index');
});

//Exporting the RouteHandler
module.exports = router;