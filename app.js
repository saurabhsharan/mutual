
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var recommendation = require('./routes/recommendation');
var detail = require('./routes/detail');
var fblogin = require('./routes/fblogin');
var friendsearch = require('./routes/friendsearch');

var local_database_name = 'mutual';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
app.get('/recommendation', recommendation.view);
app.get('/submit_reco', recommendation.submit_reco);
app.get('/detail/:fbid', detail.view);
app.get('/detail2/:fbid', detail.view2);
app.get('/fblogin', fblogin.view);
app.get('/friendsearch/:prefix', friendsearch.friendsWithPrefix);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
