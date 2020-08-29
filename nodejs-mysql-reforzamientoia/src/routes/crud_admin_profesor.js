const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/profesores/add', (req,res) =>{
   res.render('crud_admin/profesores/add');
});

router.post('/profesores/add', async (req,res) =>{
   const { rut,nombre_completo,telefono,correo,id_curso} = req.body;
   const profesorNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('INSERT INTO profesores set ?', [profesorNuevo]);
   req.flash('success', 'Profesor guardado satisfactoriamente!');
   res.redirect('/administracion/profesores')
 });

 router.get('/profesores', async (req,res) => {
   const profesores = await pool.query('SELECT * FROM profesores');
   res.render('crud_admin/profesores/list',{ profesores });
 });

 router.get('/profesores/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM profesores WHERE id = ?',[id]);
   req.flash('success', 'Profesor eliminado satisfactoriamente!'); 
   res.redirect('/administracion/profesores')
});

router.get('/profesores/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const profesores = await pool.query('SELECT * FROM profesores WHERE id = ?', [id] );
   console.log(profesores[0]);
   res.render('crud_admin/profesores/edit', {profesor : profesores[0]});
});
router.post('/profesores/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const { rut,nombre_completo,telefono,correo,id_curso} = req.body;
   const profesorNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('UPDATE profesores set ? WHERE id = ?', [profesorNuevo, id])
   req.flash('success', 'Profesor actualizado satisfactoriamente!');
   res.redirect('/administracion/profesores')
});
module.exports = router; 