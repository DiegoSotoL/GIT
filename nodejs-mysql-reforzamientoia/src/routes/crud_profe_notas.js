const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/notas', async (req,res) => {
   
   res.render('crud_profe/notas/list');
 });

 router.get('/notas/add', async (req,res) => {
   
  res.render('crud_profe/notas/add');
});
module.exports = router; 