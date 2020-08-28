const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { dirname } = require('path');

//Init
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global
app.use((req,res,next) =>{
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