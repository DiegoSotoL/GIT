import { Component, OnInit, HostBinding } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import {PaymentService} from '../../services/payment.service';
import {ActivatedRoute,Router} from '@angular/router';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  payment:Payment={
    payment_id:0,
    customer_id: 0,
    staff_id: 0,
    rental_id: 0,
    amount: 0,
    payment_date: new Date(),
    last_update: new Date()
  };

  edit:boolean =false;


  constructor(private paymentService:PaymentService, private router:Router, private activatedRoute:ActivatedRoute){ }

  ngOnInit() {
    const params=this.activatedRoute.snapshot.params;
    if(params.id){
      this.paymentService.getPay(params.id)
        .subscribe(
          res  =>{          
            this.payment=res;
            this.edit=true;
          },
          err=> console.log(err)
        )
        
      }
    }
  
  savePayment(){
    
    delete this.payment.payment_id;
   
    delete this.payment.last_update;
    this.paymentService.savePayment(this.payment)
    .subscribe(
      res =>{
        console.log(res)
        this.router.navigate(['/payment']);
      },
      err => console.error(err)
    )
  }

  updatePayment(){
    delete this.payment.payment_id;
    delete this.payment.last_update;
    this.paymentService.updatePayment(this.payment.payment_id, this.payment)
    .subscribe(
      res=>{
        console.log(res);
      },
      err=> console.log(err)
    )
    
  }
}
