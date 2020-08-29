const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { dirname } = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport')
require('passport-local')
//Init
const app = express();
require('./lib/passport')

//Config
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
  secret: 'mysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global
app.use((req,res,next) =>{
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user =req.user;
    next();
});


//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/administracion',require('./routes/crud_admin_colegio'));
app.use('/administracion',require('./routes/crud_admin_curso'));
app.use('/administracion',require('./routes/crud_admin_profesor'));
app.use('/administracion',require('./routes/crud_admin_asignatura'));
app.use('/administracion',require('./routes/crud_admin_unidad'));
app.use('/administracion',require('./routes/crud_admin_pregunta'));
//Public
app.use(express.static(path.join(__dirname, 'public' )));
//Inicio
app.listen(app.get('port'), () => {
    console.log('SERVER EN PUERTO ', app.get('port'))
});