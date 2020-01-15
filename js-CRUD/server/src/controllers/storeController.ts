import { Request, Response } from 'express';

import pool from '../database';

class StoreController {
   public async list (req: Request, res: Response) {
      await pool.query('SELECT * FROM store', function(err, result, fields) {
          if (err) throw err;
          res.json(result);
          
      });
  }
  public async getOne (req: Request, res: Response) {
   const { id } = req.params;   
   await pool.query('SELECT * FROM store WHERE store_id = ?',[id], function(err, result, fields) {
       if (err) throw err;
       res.json(result);
       
   });
}
  

   public async create (req: Request, res: Response) {
    await pool.query('INSERT INTO store set ?', [req.body], function(err, result, field) {
        if (err) throw err;
        res.json(result);
       
    });
 }
      

   public async delete(req: Request, res: Response) {
      const { id } = req.params;
      await pool.query('DELETE FROM store WHERE store_id= ?',[id], function(err, result, field){
         if (err) throw err;
         res.json(result);    
      });
      res.json({ text: 'eliminanda la tienda con id ?' + req.params.id });
   }

   public  update(req: Request, res: Response) {
      const { id } = req.params;
       pool.query('UPDATE store set ? WHERE store_id = ?',[req.body, id]);
         
      res.json({ text: 'actualizanda la tienda con id ? : ' + req.params.id });
   }
}

const storeController = new StoreController();
export default storeController;