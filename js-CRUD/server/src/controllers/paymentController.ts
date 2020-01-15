import { Request, Response } from 'express';

import pool from '../database';

class PaymentController {
   public async list (req: Request, res: Response) {
      await pool.query('SELECT * FROM payment', function(err, result, fields) {
          if (err) throw err;
          res.json(result);
          
      });
  }
  public async getOne (req: Request, res: Response) {
   const { id } = req.params;   
   await pool.query('SELECT * FROM payment WHERE payment_id = ?',[id], function(err, result, fields) {
       if (err) throw err;
       res.json(result);
       
   });
}
  

   public async create (req: Request, res: Response) {
    await pool.query('INSERT INTO payment set ?', [req.body], function(err, result, field) {
        if (err) throw err;
        res.json(result);
       
    });
 }
      

   public async delete(req: Request, res: Response) {
      const { id } = req.params;
      await pool.query('DELETE FROM payment WHERE payment_id= ?',[id], function(err, result, field){
         if (err) throw err;
         res.json(result);    
      });
      res.json({ text: 'eliminado el apgo con id ?' + req.params.id });
   }

   public  update(req: Request, res: Response) {
      const { id } = req.params;
       pool.query('UPDATE payment set ? WHERE payment_id = ?',[req.body, id]);
         
      res.json({ text: 'actualizanda el pago con id ? : ' + req.params.id });
   }
}

const paymentController = new PaymentController();
export default paymentController;