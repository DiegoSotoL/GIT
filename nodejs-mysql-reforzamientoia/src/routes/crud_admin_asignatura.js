const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/asignaturas/add', isLoggedIn, (req,res) =>{
   res.render('crud_admin/asignaturas/add');
});

router.post('/asignaturas/add', isLoggedIn, async (req,res) =>{
   const { nombre_asignatura,promedio,id_profesor} = req.body;
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
   res.render('crud_admin/asignaturas/list',{ asignaturas });
 });

 router.get('/asignaturas/delete/:id', isLoggedIn, async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM asignaturas WHERE id = ?',[id]);
   req.flash('success', 'Asignatura eliminada satisfactoriamente!'); 
   res.redirect('/administracion/asignaturas')
});

router.get('/asignaturas/edit/:id', isLoggedIn, async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const asignaturas = await pool.query('SELECT * FROM asignaturas WHERE id = ?', [id] );
   console.log(asignaturas[0]);
   res.render('crud_admin/asignaturas/edit', {asignatura : asignaturas[0]});
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