import{ Router } from 'express';



import storeController from '../controllers/storeController';
class StoreRoutes{
   public router:Router = Router();

   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',storeController.list);
    this.router.get('/:id',storeController.getOne);   
    this.router.post('/',storeController.create);
    this.router.delete('/:id', storeController.delete);
    this.router.put('/:id', storeController.update);
   }
}

const storeRoutes=new StoreRoutes();
export default storeRoutes.router;