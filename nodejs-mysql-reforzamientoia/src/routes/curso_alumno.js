const express = require('express');
const router = express.Router();
var respuestas01, respuestas02, respuestas03, respuestas04, respuestas05;


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/inicio', async (req, res) => {


   res.render('curso_alumno/inicio');


});
router.get('/modulo1-base', async (req, res) => {


   res.render('curso_alumno/modulo1-base');


});
router.post('/modulo1-base', async (req, res) => {
   const { r01, r02, r03 } = req.body;
   respuestas01 = {
      r01,
      r02,
      r03
   };
   console.log(respuestas01);
   res.render('curso_alumno/modulo1-adaptado');


});
router.post('/modulo1-adaptado', async (req, res) => {
   const { r04, r05, r06 } = req.body;
   respuestas02 = {
      r04,
      r05,
      r06
   };
   console.log(respuestas02);
   res.render('curso_alumno/modulo2-1-base');


});
router.post('/modulo2-1-base', async (req, res) => {
   const { r07, r08, r09 } = req.body;
   respuestas03 = {
      r07,
      r08,
      r09
   };
   console.log(respuestas03);
   res.render('curso_alumno/modulo2-1-adaptado');
});
router.post('/modulo2-1-adaptado', async (req, res) => {

   const { r10, r11, r12 } = req.body;
   respuestas04 = {
      r10,
      r11,
      r12
   };
   console.log(respuestas04);
   res.render('curso_alumno/modulo2-2-base');


});
router.post('/modulo2-2-base', async (req, res) => {

   const { r13, r14, r15 } = req.body;
   respuestas05 = {
      r13,
      r14,
      r15
   };
   console.log(respuestas05);
   res.render('curso_alumno/modulo2-2-adaptado');


});
router.post('/modulo2-2-adaptado', async (req, res) => {
   const { r16, r17, r18 } = req.body;
   respuestas06 = {
      r16,
      r17,
      r18
   };
   console.log(respuestas01);
   console.log(respuestas02);
   console.log(respuestas03);
   console.log(respuestas04);
   console.log(respuestas05);
   console.log(respuestas06);
   res.render('curso_alumno/resultados');


});

module.exports = router;
