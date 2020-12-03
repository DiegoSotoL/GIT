const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn} = require('../lib/auth');

const pool = require ('../database');

// SIGNUP
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup',isNotLoggedIn,
    passport.authenticate('local.signup', {
        
        successRedirect: '/signin',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, async(req, res, next) => {
   /* req.check('correo ', 'Se requiere el ingreso del correo').notEmpty();
   req.check('password', 'Se requiere el ingreso de la contraseña').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        req.flash('message', errors[0].msg);
        res.redirect('/signin');
    } */

    
    const rows = await pool.query('SELECT * FROM users WHERE correo = ?', [req.body.correo]);
    const user = rows [0];
    
    var tipo = '';
        if(rows !== 'undefined' && rows.length > 0){
            if(user.tipo == 1){//administrador
                tipo = 'profile';
            }
            if(user.tipo == 2){//profesor
                tipo = 'profile';
            }
            if(user.tipo == 3){//estudiante
                tipo = 'profile';
            }
        }
        
    
    passport.authenticate('local.signin',  {
            
        successRedirect: '/'+ tipo,   
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);


});
router.get('/logout', isLoggedIn,(req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
    const {user} = req.body;
    console.log(user)
    res.render('profile');
});

module.exports = router;