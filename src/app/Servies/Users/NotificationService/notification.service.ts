import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 baseUrl =  environment.baseUrl
  constructor(private http:HttpClient,private router:Router) { }


  sendLikeNotification(NotificationData:any){

    console.log("passing notifiacation add fun",NotificationData)
    return this.http.post<any>(`${this.baseUrl}common/AddNofication`, NotificationData);

  }
}
