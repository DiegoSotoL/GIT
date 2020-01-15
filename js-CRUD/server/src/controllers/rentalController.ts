import { Request, Response } from 'express';

import pool from '../database';

class RentalController {
   public async list (req: Request, res: Response) {
      await pool.query('SELECT * FROM rental', function(err, result, fields) {
          if (err) throw err;
          res.json(result);
          
      });
  }
  public async getOne (req: Request, res: Response) {
   const { id } = req.params;   
   await pool.query('SELECT * FROM rental WHERE rental_id = ?',[id], function(err, result, fields) {
       if (err) throw err;
       res.json(result);
       
   });
}
  

   public async create (req: Request, res: Response) {
    await pool.query('INSERT INTO rental set ?', [req.body], function(err, result, field) {
        if (err) throw err;
        res.json(result);
       
    });
 }
      

   public async delete(req: Request, res: Response) {
      const { id } = req.params;
      await pool.query('DELETE FROM rental WHERE rental_id= ?',[id], function(err, result, field){
         if (err) throw err;
         res.json(result);    
      });
      res.json({ text: 'eliminado el arriendo con id: ?' + req.params.id });
   }

   public  update(req: Request, res: Response) {
      const { id } = req.params;
       pool.query('UPDATE rental set ? WHERE rental_id = ?',[req.body, id]);
         
      res.json({ text: 'actualizanda el pago con id: ?  ' + req.params.id });
   }
}

const rentalController = new RentalController();
export default rentalController;