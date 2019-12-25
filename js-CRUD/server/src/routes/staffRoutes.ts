import{ Router } from 'express';



import staffController from '../controllers/staffController';
class StaffRoutes{
   public router:Router = Router();

   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',staffController.list);    
    this.router.post('/',staffController.create);
    this.router.delete('/:id', staffController.delete);
    this.router.put('/:id', staffController.update);
   }
}

const staffRoutes=new StaffRoutes();
export default staffRoutes.router;