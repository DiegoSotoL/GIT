import{ Router } from 'express';



import rentalController from '../controllers/rentalController';
class RentalRoutes{
   public router:Router = Router();

   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',rentalController.list);
    this.router.get('/:id',rentalController.getOne);   
    this.router.post('/',rentalController.create);
    this.router.delete('/:id', rentalController.delete);
    this.router.put('/:id', rentalController.update);
   }
}

const rentalRoutes=new RentalRoutes();
export default rentalRoutes.router;