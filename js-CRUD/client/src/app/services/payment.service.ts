import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment }from '../models/payment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  API_URI = 'http://localhost:3000/api'
  constructor(private http:HttpClient) { }

  getPayment(){
    return this.http.get(`${this.API_URI}/payment`);
  }
  getPay(id: number){
    return this.http.get(`${this.API_URI}/payment/${id}`);
  }

  savePayment(Payment:Payment){
    return this.http.post(`${this.API_URI}/payment`, Payment);
  }

  deletePayment(id: number){
    return this.http.delete(`${this.API_URI}/payment/${id}`);
  }

  updatePayment(id: number, updatedPayment):Observable<Payment>{
    return this.http.put(`${this.API_URI}/payment/${id}`, updatedPayment);
  }
}
