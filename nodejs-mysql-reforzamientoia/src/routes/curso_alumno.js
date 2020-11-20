const express = require('express');
const router = express.Router();
var respuestas01, respuestas02, respuestas03, respuestas04, respuestas05;


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/inicio', async (req, res) => {


   res.render('curso_alumno/inicio');


});
router.get('/modulo1-base', async (req, res) => {
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   console.log('abriendo pagina')
   ejerciciostipo1 = [1, 2, 3]
   ejerciciostipo2 = [4, 5, 6]
   ejerciciostipo3 = [7, 8, 9, 10]
   base1 = aleatorio(1, 3)
   base2 = aleatorio(4, 6)
   base3 = aleatorio(7, 10)
   index1 = ejerciciostipo1.indexOf(base1)
   index2 = ejerciciostipo2.indexOf(base2)
   index3 = ejerciciostipo3.indexOf(base3)

   if (index1 > -1) {
      ejerciciostipo1.splice(index1, 1);
   }
   if (index2 > -1) {
      ejerciciostipo2.splice(index2, 1);
   }
   if (index3 > -1) {
      ejerciciostipo3.splice(index3, 1);
   }
   ejerciciosbase = [base1, base2, base3]
   console.log('ejercicios random: ' + ejerciciosbase)
   console.log('ejercicios1: ' + ejerciciostipo1)
   console.log('ejercicios2: ' + ejerciciostipo2)
   console.log('ejercicios3: ' + ejerciciostipo3)
   
   res.render('curso_alumno/modulo1-base', { ej1: ejerciciosbase[0], ej2:ejerciciosbase[1], ej3:ejerciciosbase[2] });

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
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   console.log('abriendo pagina')
   ejerciciostipo1 = [1, 2, 3,4]
   ejerciciostipo2 = [5, 6, 7, 8]
   ejerciciostipo3 = [9, 10]
   base1 = aleatorio(1, 4)
   base2 = aleatorio(5, 8)
   base3 = aleatorio(9, 10)
   index1 = ejerciciostipo1.indexOf(base1)
   index2 = ejerciciostipo2.indexOf(base2)
   index3 = ejerciciostipo3.indexOf(base3)

   if (index1 > -1) {
      ejerciciostipo1.splice(index1, 1);
   }
   if (index2 > -1) {
      ejerciciostipo2.splice(index2, 1);
   }
   if (index3 > -1) {
      ejerciciostipo3.splice(index3, 1);
   }
   ejerciciosbase = [base1, base2, base3]
   console.log('ejercicios random: ' + ejerciciosbase)
   console.log('ejercicios1: ' + ejerciciostipo1)
   console.log('ejercicios2: ' + ejerciciostipo2)
   console.log('ejercicios3: ' + ejerciciostipo3)
   
   res.render('curso_alumno/modulo2-1-base', { ej1: ejerciciosbase[0], ej2:ejerciciosbase[1], ej3:ejerciciosbase[2] });


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
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   console.log('abriendo pagina')
   ejerciciostipo1 = [1, 2, 3]
   ejerciciostipo2 = [4, 5, 6, 7]
   ejerciciostipo3 = [8, 9, 10]
   base1 = aleatorio(1, 3)
   base2 = aleatorio(4, 7)
   base3 = aleatorio(8, 10)
   index1 = ejerciciostipo1.indexOf(base1)
   index2 = ejerciciostipo2.indexOf(base2)
   index3 = ejerciciostipo3.indexOf(base3)

   if (index1 > -1) {
      ejerciciostipo1.splice(index1, 1);
   }
   if (index2 > -1) {
      ejerciciostipo2.splice(index2, 1);
   }
   if (index3 > -1) {
      ejerciciostipo3.splice(index3, 1);
   }
   ejerciciosbase = [base1, base2, base3]
   console.log('ejercicios random: ' + ejerciciosbase)
   console.log('ejercicios1: ' + ejerciciostipo1)
   console.log('ejercicios2: ' + ejerciciostipo2)
   console.log('ejercicios3: ' + ejerciciostipo3)
   
   res.render('curso_alumno/modulo2-2-base', { ej1: ejerciciosbase[0], ej2:ejerciciosbase[1], ej3:ejerciciosbase[2] });


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
