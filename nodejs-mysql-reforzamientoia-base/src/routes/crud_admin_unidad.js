const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/unidades/add', (req,res) =>{
   res.render('crud_admin/unidades/add');
});

router.post('/unidades/add', async (req,res) =>{
   const { nombre_unidad,id_asignatura} = req.body;
   const unidadNueva ={
      nombre_unidad,
      id_asignatura
   };
   await pool.query('INSERT INTO unidades set ?', [unidadNueva]);
   req.flash('success', 'Unidad guardada satisfactoriamente!');
   res.redirect('/administracion/unidades')
 });

 router.get('/unidades', async (req,res) => {
   const unidades = await pool.query('SELECT * FROM unidades');
   res.render('crud_admin/unidades/list',{ unidades });
 });

 router.get('/unidades/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM unidades WHERE id = ?',[id]);
   req.flash('success', 'Unidad eliminada satisfactoriamente!'); 
   res.redirect('/administracion/unidades')
});

router.get('/unidades/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const unidades = await pool.query('SELECT * FROM unidades WHERE id = ?', [id] );
   console.log(unidades[0]);
   res.render('crud_admin/unidades/edit', {unidad : unidades[0]});
});
router.post('/unidades/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const { nombre_unidad,id_asignatura} = req.body;
   const unidadNueva ={
      nombre_unidad,
      id_asignatura
   };
   await pool.query('UPDATE unidades set ? WHERE id = ?', [unidadNueva, id])
   req.flash('success', 'Unidad actualizada satisfactoriamente!');
   res.redirect('/administracion/unidades')
});
module.exports = router; 