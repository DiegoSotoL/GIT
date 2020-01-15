import { Component, OnInit, HostBinding } from '@angular/core';

import { RentalService } from '../../services/rental.service';


@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  
  @HostBinding('class') classes = 'row';
  
  rental:any=[];

  constructor(private rentalService:RentalService) { }

  ngOnInit() {
    this.getRenta();
  }
  getRenta(){
    this.rentalService.getRental().subscribe(
      res => {
        
        this.rental =res;
      },
      err => console.error(err)
    )
  }
  deleteRental(id:number){
    this.rentalService.deleteRental(id).subscribe(
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


