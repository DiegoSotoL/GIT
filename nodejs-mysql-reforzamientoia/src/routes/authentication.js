const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
   /* req.check('correo ', 'Se requiere el ingreso del correo').notEmpty();
   req.check('password', 'Se requiere el ingreso de la contraseña').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        req.flash('message', errors[0].msg);
        res.redirect('/signin');
    } */
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

module.exports = router;