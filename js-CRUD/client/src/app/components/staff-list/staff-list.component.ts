import { Component, OnInit, HostBinding } from '@angular/core';

import { StaffService } from '../../services/staff.service';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  
  @HostBinding('class') classes = 'row';
  
  staff:any=[];

  constructor(private staffService:StaffService) { }

  ngOnInit() {
    this.getStaff();
  }
  getStaff(){
    this.staffService.getStaff().subscribe(
      res => {
        
        this.staff =res;
      },
      err => console.error(err)
    )
  }
  deleteStaff(id:number){
    this.staffService.deleteStaff(id).subscribe(
      res=>{
        
        
        if(res){
          this.getStaff();
          
        }
        
      },
      err => {
        console.log(err)
        
        

      }
    )

    }
  }


