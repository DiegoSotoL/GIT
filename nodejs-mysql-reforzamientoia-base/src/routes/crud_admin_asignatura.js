const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/asignaturas/add', isLoggedIn, async (req,res) =>{
   const profesores = await pool.query('SELECT * FROM profesores');

   res.render('crud_admin/asignaturas/add',{profesores:profesores});
});

router.post('/asignaturas/add', isLoggedIn, async (req,res) =>{
   function getID(val){
      id = val.charAt(0)
      return id
   }
   const { nombre_asignatura,promedio} = req.body;
   const id_profesor = getID(req.body.id_profesor)
   const asignaturaNueva ={
      nombre_asignatura,
      promedio,
      id_profesor
   };
   await pool.query('INSERT INTO asignaturas set ?', [asignaturaNueva]);
   req.flash('success', 'Asignatura guardada satisfactoriamente!');
   res.redirect('/administracion/asignaturas');
 });

 router.get('/asignaturas', isLoggedIn, async (req,res) => {
   const asignaturas = await pool.query('SELECT * FROM asignaturas');
   resultArray = JSON.parse(JSON.stringify(asignaturas));


  var nombresProfesores = []

  for (i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].id_profesor)
    nombre = await pool.query('SELECT nombre_completo FROM profesores WHERE id = ' + resultArray[i].id_profesor);
    nombresProfesores.push(nombre)

  }
  for (i = 0; i < nombresProfesores.length; i++) {
    console.log(nombresProfesores[i][0].nombre_completo)
    resultArray[i].id_profesor = nombresProfesores[i][0].nombre_completo
  }
   res.render('crud_admin/asignaturas/list',{ asignaturas:resultArray});
 });

 router.get('/asignaturas/delete/:id', isLoggedIn, async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM asignaturas WHERE id = ?',[id]);
   req.flash('success', 'Asignatura eliminada satisfactoriamente!'); 
   res.redirect('/administracion/asignaturas')
});

router.get('/asignaturas/edit/:id', isLoggedIn, async (req,res) => {
   const profesores = await pool.query('SELECT * FROM profesores');
   console.log(req.params.nombre);
   const { id } = req.params;
   const asignaturas = await pool.query('SELECT * FROM asignaturas WHERE id = ?', [id] );
   console.log(asignaturas[0]);
   res.render('crud_admin/asignaturas/edit', {asignatura : asignaturas[0],profesores:profesores});
});
router.post('/asignaturas/edit/:id', isLoggedIn, async ( req , res ) => {
   const{id} = req.params;
   const { nombre_asignatura,promedio,id_profesor} = req.body;
   const asignaturaNueva ={
      nombre_asignatura,
      promedio,
      id_profesor
   };
   await pool.query('UPDATE asignaturas set ? WHERE id = ?', [asignaturaNueva, id])
   req.flash('success', 'Asignatura actualizada satisfactoriamente!');
   res.redirect('/administracion/asignaturas')
});
module.exports = router; 