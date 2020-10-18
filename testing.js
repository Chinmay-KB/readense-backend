var JSDOM = require('jsdom').JSDOM;
var { Readability } = require('@mozilla/readability');
const fetch = require('node-fetch');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
var read = require('node-readability');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;
app.get('/', function(req, res) {
    res.send("Welcome to Readense");
})
app.get('/fetch', function(req, res) {
    var url = req.query.url;
    var str = "Hello there!";

    fetch(url, {
        mode: 'no-cors',
        method: 'get'
    }).then(
        function(res) {
            return res.text();
        }
    ).then(function(html) {
        read(html, function(err, article, meta) {
            res.json({
                content: article.content,
                title: article.title,
            });


        });
        //return article;
    });
    // .then((article) => res.json({
    //     content: article.content,
    //     headline: article.headline,
    //     tags: article.tags,
    //     image: article.image
    // }));

});

app.listen(port, () => {
    console.log(`Readense app listening at http://localhost:${port}`)
});