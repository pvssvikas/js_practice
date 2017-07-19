var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('eregister',['users']);

var app = express();

app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
 

/* GET home page. */
app.get('/', function(req, res) {
  db.users.find(function (err, docs) {
	  res.render('index', { 
    title: 'Registration',
    users: docs 
      });
   })
});


app.post('/add', function(req,res){
  req.checkBody("first_name","First name required").notEmpty();
  req.checkBody('last_name','Last name required').notEmpty();
  req.checkBody('email','email required').notEmpty();
  req.checkBody('pwd','Password required').notEmpty();
  req.checkBody('pwd2','Re enter password').equals(req.body.pwd);;

  var errors = req.validationErrors();

  if(errors){
    db.users.find(function (err, docs) {
      res.render('index',{ 
      title: 'Registration',
      errors: errors,
      users: docs
      });
    });
    console.log("errors");
  }
    else{
    var newUser = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        pwd: req.body.pwd,
        gender:req.body.gender 
        }
        db.users.insert(newUser,function(err,result){
          if(err){
            console.log.err();
          }
          res.redirect('/');
        })
  }
});

app.post('/del', function(req,res){
  db.users.find(function (err, docs) {
    res.render('index',{ 
    title: 'Registration',
    users: docs
  });
  console.log(req.body.name);
  });
  /*db.users.remove({'first_name':req.body.first_name},function(err,result){
     if(err){
      console.log.err();
      }
      
    });*/
});

app.use(function(res,req,next){
  res.local.errors = null
  next();
})

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
