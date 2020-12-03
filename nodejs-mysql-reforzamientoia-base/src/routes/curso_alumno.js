const express = require('express');
const passport = require('passport');
const router = express.Router();
const {google} = require('googleapis')
const keys = require('../../apikeys/keys.json')
const pool = require ('../database');
const { isLoggedIn } = require('../lib/auth');
const nodemailer = require("nodemailer");
var respuestas01, respuestas02, respuestas03, respuestas04, respuestas05;
var resultados = [];
var motivacionIntrinseca
var creditosUsuario =0
var rutUser = ''; 
const client = new google.auth.JWT(
   keys.client_email,
   null,
   keys.private_key,
   ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){
   if(err){
      console.log(err)
      return
   }else{
      console.log('connected')
      gsrun(client, 'asd')
   }
})
async function gsrun(client,rut){
   const gsapi = google.sheets({version:'v4', auth: client})
   const opt = {
      spreadsheetId: '16f5of8JuOJCY53PdLCk-MmAsi4zb1Pa-MRky3FXuzdI',
      range : 'A2:I1000'
   };
   let data = await gsapi.spreadsheets.values.get(opt);
   let dataArray = data.data.values
   var encontrado
   for(i =0;i<dataArray.length;i++){
      if(dataArray[i][1] == rut){
         
         encontrado=dataArray[i]
      }else{
         console.log(false)
         
      }
      
   }
   console.log(encontrado)
   return encontrado
   
   
}



router.get('/inicio/:id', async (req, res) => {
   
   
   const rows = await pool.query('SELECT * FROM users WHERE id = '+req.user.id);
   user = rows [0];
   rutUser=user.rut
   res.render('curso_alumno/inicio',{idUser : req.params.id});


});

router.get('/tienda', async (req, res) => {
   

   avatares = await pool.query('SELECT * FROM avatares');
   const puntosUser= await pool.query('SELECT puntos FROM users WHERE rut ='+rutUser);
   resultPuntos = JSON.parse(JSON.stringify(puntosUser));
   puntos = resultPuntos[0].puntos
   
   res.render('curso_alumno/tienda',{avatares:avatares, puntos:puntos});
   
   

});
router.get('/tienda/misobjetos/:id', async (req, res) => {
   

   
   const avatares= await pool.query('SELECT * FROM avataresuser WHERE id_user = '+req.params.id);
   
   
   res.render('curso_alumno/misobjetos',{avatares:avatares});
   
   

});
router.get('/tienda/usar/:id', async(req,res) => {
   pool.query('UPDATE users SET idAvatar='+req.params.id+' WHERE rut ='+rutUser)
   
   res.redirect('/profile') 
});
router.get('/tienda/canjear/:id', async(req,res) => {
   console.log(req.params.id)
   const puntosUser= await pool.query('SELECT puntos FROM users WHERE rut ='+rutUser);
   resultPuntos = JSON.parse(JSON.stringify(puntosUser));
   puntos = resultPuntos[0].puntos
   const costoAvatar= await pool.query('SELECT precio FROM avatares WHERE id = '+req.params.id);
   resultCosto = JSON.parse(JSON.stringify(costoAvatar));
   costo = resultCosto[0].precio
   
   
   if(costo<=puntos){
      puntos = puntos-costo
      pool.query('UPDATE users SET puntos='+puntos+' WHERE rut = '+rutUser)
      pool.query('UPDATE users SET idAvatar='+req.params.id+' WHERE rut ='+rutUser)
      const id_avatar = req.params.id;
      const idUser2 = await pool.query('SELECT id FROM users WHERE rut ='+rutUser);
      const id_user = idUser2[0].id
      const insertAvatar ={
         id_avatar,
         id_user
      };
      await pool.query('INSERT INTO avataresuser set ?', [insertAvatar]);
   }else{
      req.flash('message','NO SE HA REALIZADO EL CANJE: SALDO INSUFICIENTE')

      /* mensaje alerta */
   }


   

   /* await pool.query('DELETE FROM profesores WHERE id = ?',[id]);
   req.flash('success', 'Profesor eliminado satisfactoriamente!'); 
   */
   res.redirect('/alumnos/tienda') 
});
router.get('/modulo1-base/:id', async (req, res) => {
   
   
    console.log('rut: '+rutUser)
   sumaPuntajes =0
   var IMI = gsrun(client, rutUser).then(r =>{
      puntajesIntrinseco = [r[4],r[5],r[8]]
      puntajesExtrinseco = [r[6],r[7]]
      for(i=0;i<puntajesIntrinseco.length;i++){
         if(puntajesIntrinseco[i]<3){
            sumaPuntajes--
         }else{
            sumaPuntajes++
         }
      }
      for(i=0;i<puntajesExtrinseco.length;i++){
         if(puntajesExtrinseco[i]<3){
            sumaPuntajes++
         }else{
            sumaPuntajes--
         }
      }
      
      console.log('suma:'+sumaPuntajes)
      if(sumaPuntajes>0){
         motivacionIntrinseca= true;
         pool.query('UPDATE users SET imi = 0 WHERE rut ='+rutUser)
      }else{
         motivacionIntrinseca=false;
         pool.query('UPDATE users SET imi = 1 WHERE rut ='+rutUser)
      }
      
      console.log('motivacion intrinseca:' + motivacionIntrinseca)
    }).catch(() => {
      console.log('Algo salió mal: promise sheet');
    });
   resultados=[]
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


   res.render('curso_alumno/modulo1-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2], restantes1: ejerciciostipo1, restantes2: ejerciciostipo2, restantes3: ejerciciostipo3 });

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
         resultados.push([ejercicio, 1, true])
      } else {
         respuestasUser[tipo - 1] = false
         resultados.push([ejercicio, 1, false])
      }

   }
   setTimeout(() => { console.log(respuestasUser) }, 000);

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
   
   ejerciciosbase = [base1, base2, base3]
   console.log('RESTANTE1: ' + restantes3[0])
   console.log('RESTANTE2: ' + restantes3[2])
   restantes3segundo = restantes3[2]

   if (restantes3[2] == 1) {
      restantes3segundo = 10
   }
   setTimeout(() => { blockNone() }, 500);
   setTimeout(() => {
      if (respuestasUser.includes(false)) {
         setTimeout(() => { res.render('curso_alumno/modulo1-adaptado', { result01: view01, result02: view02, result03: view03, rest1: restantes1[0], rest2: restantes2[0], rest3: restantes3[0], rest1b: restantes1[2], rest2b: restantes2[2], rest3b: restantes3segundo }) }, 1000);
      } else {
         res.render('curso_alumno/modulo2-1-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2] });
      }
   }, 500);
   setTimeout(() => { console.log(view01) }, 2000);
   setTimeout(() => { console.log(view02) }, 2000);
   setTimeout(() => { console.log(view03) }, 2000);






});
/* acaaaaaaaaaaaa */
router.post('/modulo1-adaptado', async (req, res) => {
   const { r04, r04b, r05, r05b, r06, r06b, p04, p04b, p05, p05b, p06, p06b, responder1,responder2,responder3} = req.body;
   respuestas02 = {
      r04,
      r04b,
      r05,
      r05b,
      r06,
      r06b,
      p04,
      p04b,
      p05,
      p05b,
      p06,
      p06b,
      responder1,
      responder2,
      responder3
   };
   console.log(respuestas02);
   var respuestasUser = [false, false, false]
   if(responder1=='block'){
      corregirModulo1(r04, p04, 1)
      corregirModulo1(r04b, p04b, 1)
   }
   if(responder2=='block'){
      corregirModulo1(r05, p05, 2)
      corregirModulo1(r05b, p05b, 2)
   }
   if(responder3=='block'){
      corregirModulo1(r06, p06, 3)
      corregirModulo1(r06b, p06b, 3)
   }


   async function corregirModulo1(respuesta, ejercicio, tipo) {
      const respuestaCorrecta = await pool.query('SELECT respuesta FROM preguntas WHERE num_ej = ' + ejercicio + ' AND modulo = 1 AND tipo= ' + tipo);

      resultArray = JSON.parse(JSON.stringify(respuestaCorrecta));
      var respuestaBuena = resultArray[0].respuesta
      console.log(respuesta)
      console.log(respuestaBuena)
      console.log()
      if (respuesta == respuestaBuena) {
         resultados.push([ejercicio, 1, true])
      } else {
         resultados.push([ejercicio, 1, false])
      }

   }

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

   res.render('curso_alumno/modulo2-1-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2], restantes1: ejerciciostipo1, restantes2: ejerciciostipo2, restantes3: ejerciciostipo3 });


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

      var respuestaBuena = resultArray[0].respuesta
      console.log(respuesta)
      console.log(respuestaBuena)
      if (respuesta == respuestaBuena) {
         respuestasUser[tipo - 1] = true
         resultados.push([ejercicio, 2, true])
      } else {
         respuestasUser[tipo - 1] = false
         resultados.push([ejercicio, 2, false])
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
   console.log('RESTANTE1' + restantes3[0])
   console.log('RESTANTE2' + restantes3[2])
   restantes3segundo = restantes3[2]

   if (restantes3[2] == 1) {
      restantes3segundo = 10
   }
   setTimeout(() => { blockNone() }, 1000);
   setTimeout(() => {
      if (respuestasUser.includes(false)) {
         setTimeout(() => { res.render('curso_alumno/modulo2-1-adaptado', { result01: view01, result02: view02, result03: view03, rest1: restantes1[0], rest2: restantes2[0], rest3: restantes3[0], rest1b: restantes1[2], rest2b: restantes2[2], rest3b: restantes3segundo }) }, 500);
      } else {
         res.render('curso_alumno/modulo2-2-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2] });
      }
   }, 500);
   setTimeout(() => { console.log(view01) }, 2000);
   setTimeout(() => { console.log(view02) }, 2000);
   setTimeout(() => { console.log(view03) }, 2000);






});
router.post('/modulo2-1-adaptado', async (req, res) => {

   const { r10, r10b, r11, r11b, r12, r12b,p10, p10b, p11, p11b, p12, p12b,responder1,responder2,responder3 } = req.body;
   respuestas04 = {
      r10,
      r10b,
      r11,
      r11b,
      r12,
      r12b,
      p10,
      p10b,
      p11,
      p11b,
      p12,
      p12b,
      responder1,
      responder2,
      responder3
   };
   console.log(respuestas04);

   if(responder1=='block'){
      corregirModulo1(r10, p10, 1)
      corregirModulo1(r10b, p10b, 1)
   }
   if(responder2=='block'){
      corregirModulo1(r11, p11, 2)
      corregirModulo1(r11b, p11b, 2)
   }
   if(responder3=='block'){
      corregirModulo1(r12, p12, 3)
      corregirModulo1(r12b, p12b, 3)
   }

   async function corregirModulo1(respuesta, ejercicio, tipo) {
      const respuestaCorrecta = await pool.query('SELECT respuesta FROM preguntas WHERE num_ej = ' + ejercicio + ' AND modulo = 2 AND tipo= ' + tipo);

      resultArray = JSON.parse(JSON.stringify(respuestaCorrecta));
      var respuestaBuena = resultArray[0].respuesta
      console.log(respuesta)
      console.log(respuestaBuena)
      if (respuesta == respuestaBuena) {
         resultados.push([ejercicio, 2, true])
      } else {
         resultados.push([ejercicio, 2, false])
      }

   }

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

   res.render('curso_alumno/modulo2-2-base', { ej1: ejerciciosbase[0], ej2: ejerciciosbase[1], ej3: ejerciciosbase[2], restantes1: ejerciciostipo1, restantes2: ejerciciostipo2, restantes3: ejerciciostipo3 });


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
         resultados.push([ejercicio,3, true])
      } else {
         respuestasUser[tipo - 1] = false
         resultados.push([ejercicio, 3, false])
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
      
   restantes3primero = restantes3[0]

   if (restantes3[0] == 1) {
      restantes3primero = 10
   }
   console.log('RESTANTE1' + restantes3[0])
   
   setTimeout(() => { blockNone() }, 1000);
   setTimeout(() => {
      if (respuestasUser.includes(false)) {
         setTimeout(() => { res.render('curso_alumno/modulo2-2-adaptado', { result01: view01, result02: view02, result03: view03, rest1: restantes1[0], rest2: restantes2[0], rest3: restantes3primero, rest1b: restantes1[2], rest2b: restantes2[2]}) }, 500);
      } else {
         res.render('curso_alumno/resultados');
      }
   }, 1000);
   setTimeout(() => { console.log(view01) }, 2000);
   setTimeout(() => { console.log(view02) }, 2000);
   setTimeout(() => { console.log(view03) }, 2000);







});
router.post('/modulo2-2-adaptado', async (req, res) => {
   var transporter = nodemailer.createTransport({
      host : 'smtp.gmail.com',
      post : 587,
      secure : false,
      auth : {
         user : 'reforzamientoia2@gmail.com',
         pass : 'dsl159951'
      }

   });
   var mailOptions = {
      from :"reforzamientoia2@gmail.com",
      to : "diego.soto.lete@gmail.com",
      subject : "Resultados reforzamiento",
      text : "dasasdasd"
   }
   
   const { r16, r16b, r17, r17b, r18,p16, p16b, p17, p17b, p18,responder1,responder2,responder3} = req.body;
   respuestas06 = {
      r16,
      r16b,
      r17,
      r17b,
      r18,
      p16,
      p16b,
      p17,
      p17b,
      p18,
      responder1,
      responder2,
      responder3
   };
   if(responder1=='block'){
      corregirModulo3(r16, p16, 1)
      corregirModulo3(r16b, p16b, 1)
   }
   if(responder2=='block'){
      corregirModulo3(r17, p17, 2)
      corregirModulo3(r17b, p17b, 2)
   }
   if(responder3=='block'){
      corregirModulo3(r18, p18, 3)
   }
   
   var respuestasUser = [false, false, false]
   
   var puntos = 0
   var puntosExtra =0

   async function corregirModulo3(respuesta, ejercicio, tipo) {
      const respuestaCorrecta = await pool.query('SELECT respuesta FROM preguntas WHERE num_ej = ' + ejercicio + ' AND modulo = 3 AND tipo= ' + tipo);
      resultArray = JSON.parse(JSON.stringify(respuestaCorrecta));
      const puntosUser= await pool.query('SELECT puntos FROM users WHERE rut ='+rutUser);
      resultPuntos = JSON.parse(JSON.stringify(puntosUser));

      var respuestaBuena = resultArray[0].respuesta
      puntos = resultPuntos[0].puntos

      console.log(respuesta)
      console.log(respuestaBuena)
      if (respuesta == respuestaBuena) {
         resultados.push([ejercicio, 3, true])
      } else {
         resultados.push([ejercicio, 3, false])
      }

   }   
   setTimeout(() => { 
      for (i=0;i<resultados.length;i++){
         if(resultados[i][2]){
            puntosExtra = puntosExtra+100
         }
      }
      puntos=puntos+puntosExtra
            
      pool.query('UPDATE users SET puntos='+puntos+' WHERE rut ='+rutUser)
   }, 1000);
   /*armar email*/
   
   const nombreProfesor = await pool.query('SELECT nombre_completo FROM profesores WHERE id_curso = 1');
   resultArray = JSON.parse(JSON.stringify(nombreProfesor));
   var nomPofe = resultArray[0].nombre_completo
   
   const nombreAlumno = await pool.query('SELECT nombre_completo FROM users WHERE rut = '+rutUser);
   resultArray2 = JSON.parse(JSON.stringify(nombreAlumno));
   var nomAlumno = resultArray2[0].nombre_completo
   
      setTimeout(() => {
       mailOptions.text='Hola '+nomPofe+' su Alumno '+nomAlumno+' ha finalizado el curso de reforzamiento de las egunda unidad "Introduccion al Algerba". A continuación se le detallara como ha sido el proceso y los factores que hemos rescatado de este:\n'
      if(motivacionIntrinseca){
         mailOptions.text=mailOptions.text.concat('El Alumno ha demostrado que presenta interés en el estudio de la materia.\n')  
      }else{
         mailOptions.text=mailOptions.text.concat('El Alumno ha demostrado que su motivacion en el aula viene de agentes externos.\n')
      }
      var buenas=0, malas=0,modulo1buenas=0,modulo2buenas=0,modulo3buenas=0
      for (i=0;i<resultados.length;i++){
         if(resultados[i][2]){
           buenas++
         }else{
            malas ++ 
         }
         if(resultados[i][2]&& resultados[i][1]==1){
            modulo1buenas++
         }
         if(resultados[i][2]&& resultados[i][1]==2){
            modulo2buenas++
         }
         if(resultados[i][2]&& resultados[i][1]==3){
            modulo3buenas++
         }
        
      }
      mailOptions.text=mailOptions.text.concat('Resultados:\nEl estudiante de un total de '+resultados.length+' preguntas ha respondido '+buenas+' preguntas correctamente '+malas+' respuestas incorrectas.\nDe las '+buenas+' respuestas correctas '+modulo1buenas+' corresponden al primer modulo de la unidad "Patrones", '+modulo2buenas+' corresponde al segundo modulo "Resolucion de ecuaciones" y '+modulo3buenas+' corresponden al tercer modulo "Problemas de planteo".')
      console.log('buenas:'+buenas)
      console.log('malas:'+malas)
      console.log('mod1:'+modulo1buenas)
      console.log('mod2:'+modulo2buenas)
      console.log('mod3:'+modulo3buenas)
      
       
      
       transporter.sendMail(mailOptions, (error,info)=>{
      if(error){
         res.status(500).send(error.message)
      }else{
         console.log('email enviado')
         res.status(200).jsonp(req.body)
      }
   })
   }, 3000);
   setTimeout(() => { res.render('curso_alumno/resultados', {puntos:puntosExtra,imi:motivacionIntrinseca})}, 1000);
});

module.exports = router;
