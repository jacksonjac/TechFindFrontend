import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private baseUrl: string = "https://findtech.jacksonr.live";

  constructor(private http: HttpClient) {

    console.log("Notification service automatically passing ..")
    this.socket = io(this.baseUrl);
    const userid = localStorage.getItem("Userid");
    if (userid) {
      this.register(userid);
     
    }
  }

  register(userid: string): void {
    console.log("Notification service passsing")
    this.socket.emit('NotificationRegister', userid);
  }


  


  sendNotification(message: any, callback: (response: any) => void): void {

       console.log("sendnofication to backend this data",message)
    this.socket.emit('sendNotification', message, callback);
  }
  receiveNotifications(): Observable<any> { // Renamed to be more descriptive
    return new Observable((observer) => {
      this.socket.on('newNotification', (notification) => { // Corrected the event name to match the backend
        console.log("Received notification:", notification);
        observer.next(notification);
      });
    });
  }

}
