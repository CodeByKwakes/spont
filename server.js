// CALL THE PACKAGES --------------------
var express        = require('express'); // call express
var app            = express(); // define our app using express
var bodyParser     = require('body-parser'); // get body-parser
var path           = require('path');
var morgan         = require('morgan'); // used to see requests
var mongoose       = require('mongoose'); // for working w/ our database
var methodOverride = require('method-override');
var exphbs         = require('express3-handlebars');
var routes         = require('./config/routes');
var mainRoutes     = require('./config/mainRoutes');
var port           = process.env.PORT || 8080; // set the port for our app

// DATABASE CONNECTION
var databaseUrl = 'mongodb://root:abc123@ds017776.mlab.com:17776/spont';
mongoose.connect(databaseUrl, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});


// APP CONFIGURATION ---------------------
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

app.use(express.static(__dirname + '/public'));
app.use(mainRoutes);
app.use(routes);

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.create({
  defaultLayout: 'main',
  layoutsDir: app.get('views') + '/layouts',
  partialsDir: [app.get('views') + '/partials'],
}).engine);
app.set('view engine', 'handlebars');

// listen on port
app.listen(port);
console.log('Express is listening on', port);