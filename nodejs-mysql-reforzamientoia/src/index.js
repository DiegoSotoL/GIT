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
var myUrlBienvenida = '';
var myUrlPregunta1 = '';
var myUrlPregunta2 = '';
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: path.join(__dirname, '../apikeys/reforzamientoalgebraia-017aa4b76248.json'),
    projectId: 'reforzamientoalgebraia'
});
const audioaibucket = storage.bucket('audios-ai');











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
        ttsBienvenida: async function () {
            const file = audioaibucket.file('bienvenida.mp3');
            const config = {
                action: 'read',
                expires: '03-17-2025'
            };
            myUrlBienvenida = await new Promise((resolve, reject) => {

                file.getSignedUrl(config).then(signedUrls => {

                    // este codigo se ejejcutara cuando llegue la respuesta
                    let myUrlBienvenida = signedUrls[0] // mi URL
                    resolve(myUrlBienvenida); // esto es el return de la promesa

                }).catch(err => {

                    console.log(error);
                    reject(error)
                });
            });
        },
        ttsPregunta1: async function () {
            const file = audioaibucket.file('p1-u2-6.mp3');
            const config = {
                action: 'read',
                expires: '03-17-2025'
            };
            myUrlPregunta1 = await new Promise((resolve, reject) => {

                file.getSignedUrl(config).then(signedUrls => {

                    // este codigo se ejejcutara cuando llegue la respuesta
                    let myUrlPregunta1 = signedUrls[0] // mi URL
                    resolve(myUrlPregunta1); // esto es el return de la promesa

                }).catch(err => {

                    console.log(error);
                    reject(error)
                });
            });
        },
        ttsPregunta2: async function () {
            const file = audioaibucket.file('p2-u2-6.mp3');
            const config = {
                action: 'read',
                expires: '03-17-2025'
            };
            myUrlPregunta2 = await new Promise((resolve, reject) => {

                file.getSignedUrl(config).then(signedUrls => {

                    // este codigo se ejejcutara cuando llegue la respuesta
                    let myUrlPregunta2 = signedUrls[0] // mi URL
                    resolve(myUrlPregunta2); // esto es el return de la promesa

                }).catch(err => {

                    console.log(error);
                    reject(error)
                });
            });
        },
        urlBienvenida: function () {
            return myUrlBienvenida;
        },
        urlPregunta1: function () {
            return myUrlPregunta1;
        },
        urlPregunta2: function () {
            return myUrlPregunta2;
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
