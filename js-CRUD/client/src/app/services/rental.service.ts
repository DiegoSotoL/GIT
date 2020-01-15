import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rental }from '../models/rental';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  API_URI = 'http://localhost:3000/api'
  constructor(private http:HttpClient) { }

  getRental(){
    return this.http.get(`${this.API_URI}/rental`);
  }
  getRenta(id: number){
    return this.http.get(`${this.API_URI}/rental/${id}`);
  }

  saveRental(rental:Rental){
    return this.http.post(`${this.API_URI}/rental`, rental);
  }

  deleteRental(id: number){
    return this.http.delete(`${this.API_URI}/rental/${id}`);
  }

  updateRental(id: number, updatedRental):Observable<Rental>{
    return this.http.put(`${this.API_URI}/rental/${id}`, updatedRental);
  }
}
