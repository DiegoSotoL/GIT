const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require ('../database');
const helpers = require ('./helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, correo, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE correo = ?', [correo]);
    if (rows.length > 0) {
      const user = rows [0];
      const validPassword = await helpers.matchPassword(password, user.password)
      if (validPassword) {
        done(null, user, req.flash('success', 'Bienvenido ' + user.nombre_completo));
      } else {
        done(null, false, req.flash('message', 'Contraseña incorrecta'));
      }
    } else {
      return done(null, false, req.flash('message', 'El correo no se encuentra registrado.'));
    }
  }));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo,password,done) => {
    
    const {nombre_completo} = req.body;
    const {tipo} = req.body;
    const nuevoUsuario = {
        correo,
        password,
        nombre_completo,
        tipo
    };
    nuevoUsuario.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [nuevoUsuario]);
    nuevoUsuario.id = result.inserId;
    return done(null, nuevoUsuario)
})); 

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
  });