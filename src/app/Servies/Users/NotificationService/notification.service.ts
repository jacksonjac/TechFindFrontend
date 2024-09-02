import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private baseUrl: string = "https://findtech.jacksonr.live";

  constructor(private http: HttpClient) {
    this.socket = io(this.baseUrl);
    const userid = localStorage.getItem("Userid");
    if (userid) {
      this.register(userid);
      this.registerForNotifications(userid);
    }
  }

  register(userid: string): void {
    console.log("user service passsing")
    this.socket.emit('register', userid);
  }
  registerForNotifications(userid: string): void {
    console.log("User service passing notification registration");
    this.socket.emit('registerNotification', userid);
  }


  sendNotification(message: any, callback: (response: any) => void): void {
    this.socket.emit('notification', message, callback);
  }
}
