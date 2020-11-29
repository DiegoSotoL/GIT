const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/cursos/add', isLoggedIn, (req,res) =>{
   res.render('crud_admin/cursos/add');
});

router.post('/cursos/add', isLoggedIn, async (req,res) =>{
   const { nombre_curso,cant_alumnos,id_colegio} = req.body;
   const cursoNuevo ={
      nombre_curso,
      cant_alumnos,
      id_colegio
   };
   await pool.query('INSERT INTO cursos set ?', [cursoNuevo]);
   req.flash('success', 'Curso guardado satisfactoriamente!');
   res.redirect('/administracion/cursos')
 });

 router.get('/cursos', isLoggedIn, async (req,res) => {
   const cursos = await pool.query('SELECT * FROM cursos');
   res.render('crud_admin/cursos/list',{ cursos });
 });

 router.get('/cursos/delete/:id', isLoggedIn, async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM cursos WHERE id = ?',[id]);
   req.flash('success', 'Curso eliminado satisfactoriamente!'); 
   res.redirect('/administracion/cursos')
});

router.get('/cursos/edit/:id', isLoggedIn, async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const cursos = await pool.query('SELECT * FROM cursos WHERE id = ?', [id] );
   console.log(cursos[0]);
   res.render('crud_admin/cursos/edit', {curso : cursos[0]});
});
router.post('/cursos/edit/:id', isLoggedIn, async ( req , res ) => {
   const{id} = req.params;
   const { nombre_curso,cant_alumnos,id_colegio} = req.body;
   const cursoNuevo ={
      nombre_curso,
      cant_alumnos,
      id_colegio
   };
   await pool.query('UPDATE cursos set ? WHERE id = ?', [cursoNuevo, id])
   req.flash('success', 'Curso actualizado satisfactoriamente!');
   res.redirect('/administracion/cursos')
});
module.exports = router; 