var express = require('express'),
    app = express();

app.use(express.static('www'));


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// app.get('/callback', function(req, res) {
//     res.render('callback', {})
// });

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
