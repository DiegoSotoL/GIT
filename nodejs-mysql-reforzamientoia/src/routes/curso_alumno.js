const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/inicio', async (req,res) => {
   
   res.render('curso_alumno/inicio');
 });
module.exports = router; 