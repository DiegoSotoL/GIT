import{ Router } from 'express';



import paymentController from '../controllers/paymentController';
class PaymentRoutes{
   public router:Router = Router();

   constructor(){
    this.config();
   }

   config():void{
    this.router.get('/',paymentController.list);
    this.router.get('/:id',paymentController.getOne);   
    this.router.post('/',paymentController.create);
    this.router.delete('/:id', paymentController.delete);
    this.router.put('/:id', paymentController.update);
   }
}

const paymentRoutes=new PaymentRoutes();
export default paymentRoutes.router;