import { Component, OnInit, HostBinding } from '@angular/core';

import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  
  @HostBinding('class') classes = 'row';
  
  payment:any=[];

  constructor(private paymentService:PaymentService) { }

  ngOnInit() {
    this.getRenta();
  }
  getRenta(){
    this.paymentService.getPayment().subscribe(
      res => {
        
        this.payment =res;
      },
      err => console.error(err)
    )
  }
  deletePayment(id:number){
    this.paymentService.deletePayment(id).subscribe(
      res=>{
        
        
        if(res){
          this.getRenta();
          
        }
        
      },
      err => {
        console.log(err)
        
        

      }
    )

    }
  }


