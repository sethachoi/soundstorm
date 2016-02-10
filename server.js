var express = require('express'),
app = express();
var fs = require('fs');

var envData = {
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID || 'cdf0a6cde22cb7171c0f2f8f1718dedd',
    SOUNDCLOUD_CALLBACK_URL: process.env.SOUNDCLOUD_CALLBACK_URL || 'http://localhost:5000/callback.html'
};
fs.writeFile('./www/config.js',"var config =" + JSON.stringify(envData, null, 4), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("JSON saved");
    }
});

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
// app.get('/env',function(req, res){
//     res.send({
//         SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID || 'cdf0a6cde22cb7171c0f2f8f1718dedd'
//      })
// });

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
