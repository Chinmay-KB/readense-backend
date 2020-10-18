const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const validUrl = require('valid-url');
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

    if (validUrl.isUri(url)) {
        read(url, function(err, article, meta) {
            res.json({
                content: "<p><h1>" + article.title + "</h1></p>" + article.content,
                title: article.title,
            });
            // res.send("<p><h1>" + article.title + "</h1></p>" + article.content);
        });
    } else res.json({
        content: "<p><strong> Invalid URL, please recheck the link you have provided</strong></p>",
        title: "Error",
    });

});

app.listen(port, () => {
    console.log(`Readense app listening at http://localhost:${port}`)
});