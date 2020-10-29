const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/alumnos/add', (req,res) =>{
   res.render('crud_profe/alumnos/add');
});

router.post('/alumnos/add', async (req,res) =>{
   const { rut,nombre_completo,telefono,correo,id_curso} = req.body;
   const alumnoNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('INSERT INTO alumnos set ?', [alumnoNuevo]);
   req.flash('success', 'Alumno guardado satisfactoriamente!');
   res.redirect('/profesores/alumnos')
 });

 router.get('/alumnos', async (req,res) => {
   const alumnos = await pool.query('SELECT * FROM alumnos');
   res.render('crud_profe/alumnos/list',{ alumnos });
 });

 router.get('/alumnos/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM alumnos WHERE id = ?',[id]);
   req.flash('success', 'Alumno eliminado satisfactoriamente!'); 
   res.redirect('/profesores/alumnos')
});

router.get('/alumnos/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const alumnos = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id] );
   console.log(alumnos[0]);
   res.render('crud_profe/alumnos/edit', {alumno : alumnos[0]});
});
router.get('/alumnos/addnota/:id', async (req,res) => {
   
   res.render('crud_profe/notas/list');
});
router.post('/alumnos/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const { rut,nombre_completo,telefono,correo,id_curso} = req.body;
   const alumnoNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('UPDATE alumnos set ? WHERE id = ?', [alumnoNuevo, id])
   req.flash('success', 'Alumno actualizado satisfactoriamente!');
   res.redirect('/profesores/alumnos')
});
module.exports = router; 