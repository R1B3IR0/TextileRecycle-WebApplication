var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect('***REMOVED***/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>  console.log('connection successful to database'))
  .catch((err) => console.error(err));
  
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var donationsRouter = require('./routes/donations');
var donatorRouter = require('./routes/donators');
var entitiesRouter = require('./routes/entities');
var dashboardRouter = require('./routes/dashboard');
var pointsRouter = require('./routes/points');
var approvalsRouter = require('./routes/approvals');
/** REST API */
var authREST = require('./routes_API/authREST');
var entityREST = require('./routes_API/entityREST');
var donationREST = require('./routes_API/donationREST');
var donatorREST = require('./routes_API/donatorREST');
/** REST API */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Habilitar CORS para todas as rotas
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/donations', donationsRouter);
app.use('/donators', donatorRouter);
app.use('/entities', entitiesRouter);
app.use('/dashboard', dashboardRouter);
app.use('/points', pointsRouter);
//Aprovação de doações
app.use('/approvals', approvalsRouter);

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/** REST API */
app.use('/api/v1/auth', authREST);
app.use('/api/v1/entity', entityREST);
app.use('/api/v1/donation', donationREST);
app.use('/api/v1/donator', donatorREST);
/** REST API */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
