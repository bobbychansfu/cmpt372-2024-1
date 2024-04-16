var express = require('express');
var app = express();
app.use(require('sanitize').middleware);
// Sanitizing HTML
app.get('/ping', function(req, res) {
    console.log(req.queryString('name'))
    var name = req.queryString('name');
    console.log(name)
	res.send('santized ' + name);
});

app.listen(8080);