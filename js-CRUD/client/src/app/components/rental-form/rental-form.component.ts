import { Component, OnInit, HostBinding } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import {RentalService} from '../../services/rental.service';
import {ActivatedRoute,Router} from '@angular/router';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  rental:Rental={
    rental_id:0,
    rental_date: new Date(),
    inventory_id: 0,
    customer_id: 0,
    return_date: new Date(),
    staff_id: 0,
    last_update: new Date()
  };

  edit:boolean =false;


  constructor(private rentalService:RentalService, private router:Router, private activatedRoute:ActivatedRoute){ }

  ngOnInit() {
    const params=this.activatedRoute.snapshot.params;
    if(params.id){
      this.rentalService.getRenta(params.id)
        .subscribe(
          res  =>{          
            this.rental=res;
            this.edit=true;
          },
          err=> console.log(err)
        )
        
      }
    }
  
  saveRental(){
    
    delete this.rental.rental_id;
   
    delete this.rental.last_update;
    this.rentalService.saveRental(this.rental)
    .subscribe(
      res =>{
        console.log(res)
        this.router.navigate(['/rental']);
      },
      err => console.error(err)
    )
  }

  updateRental(){
    delete this.rental.rental_id;
    delete this.rental.last_update;
    this.rentalService.updateRental(this.rental.rental_id, this.rental)
    .subscribe(
      res=>{
        console.log(res);
      },
      err=> console.log(err)
    )
    
  }
}
