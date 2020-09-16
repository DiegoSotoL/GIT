const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { dirname } = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const { truncateSync } = require('fs');
const app = express(); 0
const { format } = require('timeago.js');
const Speaker = require('speaker');
const texttospech = require('./texttospech');
const router = express.Router();
var url = '';











const hbs = exphbs.create({
    defaultLayout: 'main',

    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    //custom helper
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        timeago: function (timestamp) {
            return format(timestamp);
        },
        tts: function () {
            texttospech.y().then((result) => {
                
                url = result[0];
                
                    console.log(url);
                    return url; 
               
            }); 



           /*  url = 'https://storage.googleapis.com/audios-ai/bienvenida.mp3?GoogleAccessId=audio-bucket%40reforzamientoalgebraia.iam.gserviceaccount.com&Expires=16447028400&Signature=M9HeyeKduXLXGFIuIaigsuB16eBX3AF4rsq5AcDqxGi9e9r8w5Sf%2Fe80vpgbHU%2Fk3ZCpmcxgu7Yo9hS9hB%2Bxmz3pF73DmlWqdLZAPuGn9sWBW1rCYW%2BGzFjfeOjkH7AdIB%2FnjpmjqfeT03vXmJDvJ8qCRanTHUFMFFgz675udfSN1s5Yx%2BBv%2BByptsSOjNnZ482cPZzcp5bYp1Du9ZzcAgKzfP2hT%2Bd6SRkHkOIKRl1FyN0prjTTaShJDqU0aw1JKBHmrQMoXCmZTvMe1slzRGySbmY9FwzOOFJ7PRP7U7FgQRt98ajT9snRRw7AwUTHQ%2FnLkylqmuip5lkCHzUeHA%3D%3D';
             
             return url;  */
        },
        url: function(){
            setTimeout(function(){return url}, 3000);
        }
    }
});




require('passport-local')
//Init

require('./lib/passport')

//Config

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs.engine);
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});


//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/administracion', require('./routes/crud_admin_colegio'));
app.use('/administracion', require('./routes/crud_admin_curso'));
app.use('/administracion', require('./routes/crud_admin_profesor'));
app.use('/administracion', require('./routes/crud_admin_asignatura'));
app.use('/administracion', require('./routes/crud_admin_unidad'));
app.use('/administracion', require('./routes/crud_admin_pregunta'));
app.use('/profesores', require('./routes/crud_profe_alumno'));
app.use('/profesores', require('./routes/crud_profe_notas'));
app.use('/alumnos', require('./routes/curso_alumno'));
//Public
app.use(express.static(path.join(__dirname, 'public')));
//Inicio
app.listen(app.get('port'), () => {
    console.log('SERVER EN PUERTO ', app.get('port'))
});
