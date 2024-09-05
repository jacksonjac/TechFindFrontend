import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})



export class UserChatServicesService {
  private socket: Socket;
  private baseUrl: string = "https://findtech.jacksonr.live";

  constructor(private http: HttpClient) {

    console.log("chat service automatically passing ")
    this.socket = io(this.baseUrl);
    const userid = localStorage.getItem("Userid");
    if (userid) {
      this.register(userid);
     
    }
  }

  register(userid: string): void {
    console.log("user service passsing")
    this.socket.emit('register', userid);
  }


  // Method to get chat history
  getChatHistory(technicianId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chat/history/${technicianId}`);
  }

  // Method to emit a message to the server
  sendMessage(message: any, callback: (response: any) => void): void {
    this.socket.emit('message', message, callback);
  }

  // Method to listen for new messages from the server
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('Newmessage', (message) => {
        console.log("Received message:", message);
        observer.next(message);
      });
    });
  }



    receiveSeenMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('seenmessage', (data:any) => {
        console.log("your message seened");
        observer.next(data);
      });
    });
  }

  // Method to disconnect the socket
  disconnect(): void {
    this.socket.disconnect();
  }

  seenEmit(data:any){

    this.socket.emit("seenmessage",data)

  }

  updateMessageSeen(chatId: string, messageId: string) {
    console.log("passing upadateseen servie chatid=",chatId,"messsageid",messageId)
    return this.http.post('/updateMessageSeen', { chatId, messageId });
  }
  
  markMessagesAsSeen(userId: string, techId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}api/common/getChatsSeenUpdate?userid=${userId}&techid=${techId}`);
  }
  
}


