var JSDOM = require('jsdom').JSDOM;
var { Readability } = require('@mozilla/readability');
const fetch = require('node-fetch');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
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
        var doc = new JSDOM(sanitizeHtml(html
            //      {
            //     allowedAttributes: {
            //         a: ['href', 'name', 'target'],
            //         img: ['src']
            //     },
            //     allowedTags: [
            //         "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
            //         "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
            //         "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
            //         "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
            //         "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
            //         "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
            //         "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "img"
            //     ],
            //     selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],

            // }
        ), { url: url });
        let reader = new Readability(doc.window.document);
        let article = reader.parse();
        //console.log();
        fs.writeFile('response.json', article, (err) => console.log("e"));
        return article;
    }).then((article) => res.json({
        content: article.content,
        headline: article.headline,
        tags: article.tags,
        image: article.image
    }));
});

app.listen(port, () => {
    console.log(`Readense app listening at http://localhost:${port}`)
});