import { Component, OnInit, HostBinding } from '@angular/core';
import { Staff } from 'src/app/models/staff';
import {StaffService} from '../../services/staff.service';
import {ActivatedRoute,Router} from '@angular/router';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  staff:Staff={
    staff_id:0,
    first_name: '',
    last_name: '',
    address_id: 0,
    picture: '',
    email: '',
    store_id: 0,
    active: 0,
    username: '',
    password: '',
    last_update: new Date()
  };

  edit:boolean =false;


  constructor(private staffService:StaffService, private router:Router, private activatedRoute:ActivatedRoute){ }

  ngOnInit() {
    const params=this.activatedRoute.snapshot.params;
    if(params.id){
      this.staffService.getMiembro(params.id)
        .subscribe(
          res  =>{          
            this.staff=res;
            this.edit=true;
          },
          err=> console.log(err)
        )
        
      }
    }
  
  saveStaff(){
    
    delete this.staff.staff_id;
    delete this.staff.active;
    delete this.staff.last_update;
    this.staffService.saveStaff(this.staff)
    .subscribe(
      res =>{
        console.log(res)
        this.router.navigate(['/staff']);
      },
      err => console.error(err)
    )
  }

  updateStaff(){
    delete this.staff.staff_id;
    delete this.staff.active;
    delete this.staff.last_update;
    this.staffService.updateStaff(this.staff.staff_id, this.staff)
    .subscribe(
      res=>{
        console.log(res);
      },
      err=> console.log(err)
    )
    
  }
}
