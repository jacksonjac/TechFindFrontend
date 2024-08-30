import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TechChatserviceService {

  private socket: Socket;
  baseUrl = 'https://findtech.jacksonr.live';

  constructor(private http: HttpClient) {
    this.socket = io(this.baseUrl);
  }

  // Emit a message
  sendMessage(message: any, callback: (response: any) => void): void {
    this.socket.emit('message', message, callback);
  }

  // Listen for messages
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('Newmessage', (message:any) => {
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

  seenEmit(data:any){

    this.socket.emit("seenmessage",data)

  }
  // Fetch chat history
  getChatHistory(technicianId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chat/history/${technicianId}`);
  }

  // Register the socket connection with technician ID
  register(technicianId: string): void {
    console.log("tech registre pass")
    this.socket.emit('register', technicianId);
  }


markMessagesAsSeen(userId: string, techId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}api/common/getChatsbyId?userid=${userId}&techid=${techId}`);
}
}
