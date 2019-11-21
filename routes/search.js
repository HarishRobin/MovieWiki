const express = require('express');
const fetch = require('node-fetch');

// Setting up a RouteHandler `router` for request processing
const router = express.Router();

// Processing the `/info` route which is responsible for rendering detailed info page of a selected movie
router.get('/info', (req, res, next) =>{
    // Parsing GET req values
    const searchId = req.query.movieID;

    // Handling Invalid URL
    if(!searchId) return res.status(404).render('error',{'url': req.url});

    // Using FetchAPI for API calls for omdbapi and parsing the response as json
    fetch(`http://www.omdbapi.com/?apikey=2043d370&i=${searchId}&plot=full`)
    .then(resp => resp.json())
    .then(data => {

        // Handling Missing Movie Posters
        if(data.Poster === 'N/A')
        {
            data.Poster = '/images/na.jpg';
        }

        // Rendering info page for the selected Movie
        res.render('info', {'info': data})
    });
});

// Processing the `/search` route which is responsible for rendering search result page for the given text

router.get('/search', (req, res, next) => {
    
    // Collecting Search text and Result PageNo
    const searchText = req.query.searchQuery;
    var pageValue = req.query.page || 1;

    // Handling invalid requests
    if(!searchText) return res.status(404).render('error',{'url': req.url});

    // Using FetchAPI for making API calls
    fetch(`http://www.omdbapi.com/?apikey=2043d370&s=${searchText}&page=${pageValue}`)
    .then( resp => resp.json())
    .then( data => {
        // Handling invalid Search Texts
        if(data.Response === 'False') return res.render('index',{'error': true});
        
        // Making Sure all the Missing Images in the search response are handled
        data.Search.forEach(el => {
            if(el.Poster === "N/A")
            {
                el.Poster = '/images/na.jpg';
            }
        });

        // Rendering the Search Result Page for the requested text
        res.render('result', {'response' : data.Search, 'nextPageNo': parseInt(pageValue)+1 ,'query' : searchText});
    });
});

module.exports = router;