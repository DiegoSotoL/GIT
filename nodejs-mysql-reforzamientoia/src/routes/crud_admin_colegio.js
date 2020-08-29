const express = require('express');
const router = express.Router();


const pool = require('../database');


router.get('/colegios/add', (req,res) =>{
   res.render('crud_admin/colegios/add');
});

router.post('/colegios/add', async (req,res) =>{
   const { nombre,direccion,telefono,correo} = req.body;
   const ColegioNuevo ={
      nombre,
      direccion,
      telefono,
      correo
   }
   await pool.query('INSERT INTO colegios set ?', [ColegioNuevo]);
   req.flash('success', 'Colegio agregado satisfactoriamente!');
   res.redirect('/administracion/colegios')
 });

 router.get('/colegios', async (req,res) => {
   const colegios = await pool.query('SELECT * FROM colegios');
   res.render('crud_admin/colegios/list',{ colegios });
 });

 router.get('/colegios/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM colegios WHERE id = ?',[id]);
   req.flash('success', 'Colegio eliminado satisfactoriamente!'); 
   res.redirect('/administracion/colegios')
});

router.get('/colegios/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const colegios = await pool.query('SELECT * FROM colegios WHERE id = ?', [id] );
   console.log(colegios[0]);
   res.render('crud_admin/colegios/edit', {colegio : colegios[0]});
});
router.post('/colegios/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const {nombre,direccion,telefono,correo} = req.body;
   const nuevoColegio = {
      nombre,
      direccion,
      telefono,
      correo
   };
   await pool.query('UPDATE colegios set ? WHERE id = ?', [nuevoColegio, id])
   req.flash('success', 'Colegio actualizado satisfactoriamente!');
   res.redirect('/administracion/colegios')
});
module.exports = router; 