import { authInterceptor } from '../../interceptor/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseUser } from '../../model/user/IResponseUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {




  private apiUrl = 'https://gamehub-develop-e0edejfhhtbjg3gd.canadacentral-01.azurewebsites.net/api/User'; // Replace with your API URL


  // Method to get user details by ID
  constructor(private http: HttpClient) { }

  getUserInfo(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUserInfo(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, userData);
  }

  updateEmail(userId: string, email: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/UpdateEmail`, email);
  }

  updatePassword(userId: string, password: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/UpdatePassword`, password);
  }

  getAddresses(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/GetAddresses`);
  }

  updateAddress(userId: string, addresses: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/UpdateAddresses`, addresses);
  }

  deleteAddress(userId: string, address: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/DeleteAddress`, { body: address });
  }

  getPaymentMethods(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/GetBilling`);
  }

  updatePaymentMethod(userId: string, billing: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/UpdateBilling`, billing);
  }

  deletePaymentMethod(userId: string, billing: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/DeleteBilling`, {body: billing});
  }
}
