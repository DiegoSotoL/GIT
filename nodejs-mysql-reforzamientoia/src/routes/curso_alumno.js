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
   for (var i = ejerciciostipo1.length - 1; i >= 0; i--) {
      if (ejerciciostipo1[i] == base1) {
         ejerciciostipo1.splice(i, 1);
      }
   }
   for (var i = ejerciciostipo2.length - 1; i >= 0; i--) {
      if (ejerciciostipo2[i] == base2) {
         ejerciciostipo2.splice(i, 1);
      }
   }
   for (var i = ejerciciostipo3.length - 1; i >= 0; i--) {
      if (ejerciciostipo3[i] == base3) {
         ejerciciostipo3.splice(i, 1);
      }
   }
   
   
   /* 
   index1 = ejerciciostipo1.indexOf(base1)
   index2 = ejerciciostipo2.indexOf(base2)
   index3 = ejerciciostipo3.indexOf(base3)
   console.log('index:' + index1 + ',' + index2 + ',' + index3)

   if (index1 > -1) {
      ejerciciostipo1.splice(index1, 1);
   }
   if (index2 > -1) {
      ejerciciostipo2.splice(index2, 1);
   }
   if (index3 > -1) {
      ejerciciostipo3.splice(index3, 1);
   } */
   ejerciciosbase = [base1, base2, base3]
   console.log('ejercicios random: ' + ejerciciosbase)
   console.log('ejercicios1: ' + ejerciciostipo1)
   console.log('ejercicios2: ' + ejerciciostipo2)
   console.log('ejercicios3: ' + ejerciciostipo3)


   res.render('curso_alumno/modulo1-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2], restantes1: ejerciciostipo1,restantes2: ejerciciostipo2, restantes3: ejerciciostipo3 });

});
router.post('/modulo1-base', async (req, res) => {
   const { r01, p01, r02, p02, r03, p03, restantes1, restantes2, restantes3 } = req.body;
   respuestas01 = {
      r01,
      p01,
      r02,
      p02,
      r03,
      p03,
      restantes1,
      restantes2,
      restantes3
   };
   console.log(respuestas01);

   var respuestasUser = [false, false, false]
   corregirModulo1(r01, p01, 1)
   corregirModulo1(r02, p02, 2)
   corregirModulo1(r03, p03, 3)

   async function corregirModulo1(respuesta, ejercicio, tipo) {
      const respuestaCorrecta = await pool.query('SELECT respuesta FROM preguntas WHERE num_ej = ' + ejercicio + ' AND modulo = 1 AND tipo= ' + tipo);

      resultArray = JSON.parse(JSON.stringify(respuestaCorrecta));
      var respuestaBuena = resultArray[0].respuesta
      console.log(respuesta)
      console.log(respuestaBuena)
      if (respuesta == respuestaBuena) {
         respuestasUser[tipo - 1] = true
      } else {
         respuestasUser[tipo - 1] = false
      }

   }
   setTimeout(() => { console.log(respuestasUser) }, 2000);

   var view01, view02, view03
   function blockNone() {
      if (respuestasUser[0] == false) {
         view01 = 'block'
      } else {
         view01 = 'none'
      }
      if (respuestasUser[1] == false) {
         view02 = 'block'
      } else {
         view02 = 'none'
      }
      if (respuestasUser[2] == false) {
         view03 = 'block'
      } else {
         view03 = 'none'
      }

   }
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   ejerciciostipo1 = [1, 2, 3]
   ejerciciostipo2 = [4, 5, 6, 7]
   ejerciciostipo3 = [8, 9, 10]
   base1 = aleatorio(1, 3)
   base2 = aleatorio(4, 7)
   base3 = aleatorio(8, 10)
   for (var i = ejerciciostipo1.length - 1; i >= 0; i--) {
      if (ejerciciostipo1[i] == base1) {
         ejerciciostipo1.splice(i, 1);
      }
   }
   for (var i = ejerciciostipo2.length - 1; i >= 0; i--) {
      if (ejerciciostipo2[i] == base2) {
         ejerciciostipo2.splice(i, 1);
      }
   }
   for (var i = ejerciciostipo3.length - 1; i >= 0; i--) {
      if (ejerciciostipo3[i] == base3) {
         ejerciciostipo3.splice(i, 1);
      }
   }
   /* index1 = ejerciciostipo1.indexOf(base1)
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
   } */
   ejerciciosbase = [base1, base2, base3]
   segundo1=restantes1[2]
   segundo2=restantes2[2]
   segundo3=restantes3[2]
   setTimeout(() => { blockNone() }, 1000);
   setTimeout(() => {
      if (respuestasUser.includes(false)) {
         setTimeout(() => {res.render('curso_alumno/modulo1-adaptado', { result01: view01, result02: view02, result03: view03,rest1: restantes1[0], rest2: restantes2[0],rest3: restantes3[0],rest1b: restantes1[2], rest2b: restantes2[2],rest3b: restantes3[2]  })}, 2000);        
      } else {
         res.render('curso_alumno/modulo2-1-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2] });
      }
   }, 1000);
   setTimeout(() => { console.log(view01) }, 2000);
   setTimeout(() => { console.log(view02) }, 2000);
   setTimeout(() => { console.log(view03) }, 2000);






});
/* acaaaaaaaaaaaa */
router.post('/modulo1-adaptado', async (req, res) => {
   const { r04, r04b, r05, r05b, r06, r06b } = req.body;
   respuestas02 = {
      r04,
      r04b,
      r05,
      r05b,
      r06,
      r06b
   };
   console.log(respuestas02);

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

   res.render('curso_alumno/modulo2-1-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2], restantes1: ejerciciostipo1,restantes2: ejerciciostipo2 , restantes3: ejerciciostipo3 });


});
/* acaaaaaaaaaaaaaaaa */
router.post('/modulo2-1-base', async (req, res) => {
   const { r07, p07, r08, p08, r09, p09, restantes1, restantes2, restantes3 } = req.body;
   respuestas03 = {
      r07,
      p07,
      r08,
      p08,
      r09,
      p09,
      restantes1,
      restantes2,
      restantes3
   };
   var respuestasUser = [false, false, false]
   corregirModulo2(r07, p07, 1)
   corregirModulo2(r08, p08, 2)
   corregirModulo2(r09, p09, 3)

   async function corregirModulo2(respuesta, ejercicio, tipo) {
      const respuestaCorrecta = await pool.query('SELECT respuesta FROM preguntas WHERE num_ej = ' + ejercicio + ' AND modulo = 2 AND tipo= ' + tipo);

      resultArray = JSON.parse(JSON.stringify(respuestaCorrecta));
      console.log('VERRRRRRRRRRRRRRR' + resultArray)
      var respuestaBuena = resultArray[0].respuesta
      console.log(respuesta)
      console.log(respuestaBuena)
      if (respuesta == respuestaBuena) {
         respuestasUser[tipo - 1] = true
      } else {
         respuestasUser[tipo - 1] = false
      }

   }
   setTimeout(() => { console.log(respuestasUser) }, 2000);

   var view01, view02, view03
   function blockNone() {
      if (respuestasUser[0] == false) {
         view01 = 'block'
      } else {
         view01 = 'none'
      }
      if (respuestasUser[1] == false) {
         view02 = 'block'
      } else {
         view02 = 'none'
      }
      if (respuestasUser[2] == false) {
         view03 = 'block'
      } else {
         view03 = 'none'
      }

   }
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   ejerciciostipo1 = [1, 2, 3, 4]
   ejerciciostipo2 = [5, 6, 7, 8]
   ejerciciostipo3 = [9, 10]
   base1 = aleatorio(1, 4)
   base2 = aleatorio(5, 8)
   base3 = aleatorio(9, 10)
   for (var i = ejerciciostipo1.length - 1; i >= 0; i--) {
      if (ejerciciostipo1[i] == base1) {
         ejerciciostipo1.splice(i, 1);
      }
   }
   for (var i = ejerciciostipo2.length - 1; i >= 0; i--) {
      if (ejerciciostipo2[i] == base2) {
         ejerciciostipo2.splice(i, 1);
      }
   }
   for (var i = ejerciciostipo3.length - 1; i >= 0; i--) {
      if (ejerciciostipo3[i] == base3) {
         ejerciciostipo3.splice(i, 1);
      }
   }
   /* index1 = ejerciciostipo1.indexOf(base1)
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
   } */
   ejerciciosbase = [base1, base2, base3]
   setTimeout(() => { blockNone() }, 1000);
   setTimeout(() => {
      if (respuestasUser.includes(false)) {
         setTimeout(() => { res.render('curso_alumno/modulo2-1-adaptado', {  result01: view01, result02: view02, result03: view03,rest1: restantes1[0], rest2: restantes2[0],rest3: restantes3[0],rest1b: restantes1[2], rest2b: restantes2[2],rest3b: restantes3[2]  })}, 2000);
      } else {
         res.render('curso_alumno/modulo2-2-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2] });
      }
   }, 1000);
   setTimeout(() => { console.log(view01) }, 2000);
   setTimeout(() => { console.log(view02) }, 2000);
   setTimeout(() => { console.log(view03) }, 2000);






});
router.post('/modulo2-1-adaptado', async (req, res) => {

   const { r10,r10b, r11,r11b, r12,r12b } = req.body;
   respuestas04 = {
      r10,
      r10b,
      r11,
      r11b,
      r12,
      r12b
   };
   console.log(respuestas04);
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   console.log('abriendo pagina')
   ejerciciostipo1 = [1, 2, 3, 4]
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

   res.render('curso_alumno/modulo2-2-base', {ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2], restantes1: ejerciciostipo1,restantes2: ejerciciostipo2, restantes3: ejerciciostipo3  });


});
router.post('/modulo2-2-base', async (req, res) => {
   const { r13, p13, r14, p14, r15, p15, restantes1, restantes2, restantes3 } = req.body;
   respuestas03 = {
      r13,
      p13,
      r14,
      p14,
      r15,
      p15,
      restantes1,
      restantes2,
      restantes3
   };
   var respuestasUser = [false, false, false]
   corregirModulo3(r13, p13, 1)
   corregirModulo3(r14, p14, 2)
   corregirModulo3(r15, p15, 3)

   async function corregirModulo3(respuesta, ejercicio, tipo) {
      const respuestaCorrecta = await pool.query('SELECT respuesta FROM preguntas WHERE num_ej = ' + ejercicio + ' AND modulo = 3 AND tipo= ' + tipo);

      resultArray = JSON.parse(JSON.stringify(respuestaCorrecta));
      var respuestaBuena = resultArray[0].respuesta
      console.log(respuesta)
      console.log(respuestaBuena)
      if (respuesta == respuestaBuena) {
         respuestasUser[tipo - 1] = true
      } else {
         respuestasUser[tipo - 1] = false
      }

   }
   setTimeout(() => { console.log(respuestasUser) }, 2000);

   var view01, view02, view03
   function blockNone() {
      if (respuestasUser[0] == false) {
         view01 = 'block'
      } else {
         view01 = 'none'
      }
      if (respuestasUser[1] == false) {
         view02 = 'block'
      } else {
         view02 = 'none'
      }
      if (respuestasUser[2] == false) {
         view03 = 'block'
      } else {
         view03 = 'none'
      }

   }
   function aleatorio(minimo, maximo) {
      return Math.round(Math.random() * (maximo - minimo) + minimo);
   }
   ejerciciostipo1 = [1, 2, 3, 4]
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
   setTimeout(() => { blockNone() }, 1000);
   setTimeout(() => {
      if (respuestasUser.includes(false)) {
         setTimeout(() => { res.render('curso_alumno/modulo2-2-adaptado', {  result01: view01, result02: view02, result03: view03,rest1: restantes1[0], rest2: restantes2[0],rest3: restantes3[0],rest1b: restantes1[2], rest2b: restantes2[2],rest3b: restantes3[2]  })}, 2000);
      } else {
         res.render('curso_alumno/resultados');
      }
   }, 1000);
   setTimeout(() => { console.log(view01) }, 2000);
   setTimeout(() => { console.log(view02) }, 2000);
   setTimeout(() => { console.log(view03) }, 2000);







});
router.post('/modulo2-2-adaptado', async (req, res) => {
   const { r16,r16b, r17,r17b, r18,r18b } = req.body;
   respuestas06 = {
      r16,
      r16b,
      r17,
      r17b,
      r18,
      r18b
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
