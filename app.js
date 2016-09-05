// require all of our packages at the top
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var path           = require('path');
var expressLayouts = require('express-ejs-layouts');
var ejs            = require('ejs');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var routes         = require('./config/routes');
var port           = process.env.PORT || 8080;

// contect to our database
var databaseUrl = 'mongodb://root:abc123@ds017776.mlab.com:17776/spont';
mongoose.connect(databaseUrl, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

// create a new express app
var app = express();

// setup our middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req){
  if (req.body && typeof req.body == 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

app.use(routes);

//set up our views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// listen on port
app.listen(port);
console.log('Express is listening on', port);
