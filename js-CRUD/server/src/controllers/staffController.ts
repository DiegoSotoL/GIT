import { Request, Response } from 'express';

import pool from '../database';

class StaffController {
   public async list (req: Request, res: Response) {
      await pool.query('SELECT * FROM staff', function(err, result, fields) {
          if (err) throw err;
          res.json(result);
          
      });
  }

  

   public async create (req: Request, res: Response) {
    await pool.query('INSERT INTO staff set ?', [req.body], function(err, result, field) {
        if (err) throw err;
        res.json(result);
       
    });
 }
      

   public async delete(req: Request, res: Response) {//ARREGLAR FUNCION PROBLEMAS CON CLAVES FORANEAS
      const { id } = req.params;
      await pool.query('DELETE FROM staff WHERE staff_id= ?',[id], function(err, result, field){
         if (err) throw err;
         res.json(result);    
      });
      res.json({ text: 'eliminando el miembro del staff cono id:  ' + req.params.id });
   }

   public  update(req: Request, res: Response) {
      const { id } = req.params;
       pool.query('UPDATE staff set ? WHERE staff_id = ?',[req.body, id]);
         
      res.json({ text: 'actualizando el miembro del staff con id: ' + req.params.id });
   }
}

const staffController = new StaffController();
export default staffController;