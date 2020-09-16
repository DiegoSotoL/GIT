const express = require ('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { join } = require('path');
var engines = require('consolidate');

//init
const app = express();
//setting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', engines.swig); // take note, using 'html', not 'ejs' or 'pug'..

app.set('view engine', 'pug');
 // also 'html' here.
app.engine('.handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.handlebars',
  helpers: require('./lib/handlebars')
}))

app.set('view engine', '.handlebars');

//midle
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//global
app.use((req,re,next) =>{
    next();
});


//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
//public
app.use(express.static(path.join(__dirname, 'public')));

//start
app.listen(app.get('port'), ()=>{
    console.log('server onport: ', app.get('port')); 
});