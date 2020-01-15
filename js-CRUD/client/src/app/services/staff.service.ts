import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Staff }from '../models/staff';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StaffService {
  API_URI = 'http://localhost:3000/api'
  constructor(private http:HttpClient) { }

  getStaff(){
    return this.http.get(`${this.API_URI}/staff`);
  }
  getMiembro(id: number){
    return this.http.get(`${this.API_URI}/staff/${id}`);
  }

  saveStaff(staff:Staff){
    return this.http.post(`${this.API_URI}/staff`, staff);
  }

  deleteStaff(id: number){
    return this.http.delete(`${this.API_URI}/staff/${id}`);
  }

  updateStaff(id: number, updatedStaff):Observable<Staff>{
    return this.http.put(`${this.API_URI}/staff/${id}`, updatedStaff);
  }
}
