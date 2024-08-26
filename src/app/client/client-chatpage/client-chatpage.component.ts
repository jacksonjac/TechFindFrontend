import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserChatServicesService } from 'src/app/Servies/Users/chatService/chat-servies.service';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

@Component({
  selector: 'app-client-chatpage',
  templateUrl: './client-chatpage.component.html',
  styleUrls: ['./client-chatpage.component.scss']
})
export class ClientChatpageComponent implements OnInit{
  technicianId: any;
  messages: any[] = [];
  newMessage: string = '';
  Userid: any;
  technicianData: any;
  messagebox:boolean=false
  private messageSubscription: Subscription | undefined;

  constructor(
    private chatService: UserChatServicesService, 
    private route: ActivatedRoute,
    private auth: UserAuthService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.technicianId = this.route.snapshot.paramMap.get('id');   
    this.Userid = localStorage.getItem('Userid');
    console.log('User ID for client chat:', this.Userid);
    console.log('Tech ID for client chat:', this.technicianId);

    this.chatService.register(this.Userid);

    this.messageSubscription = this.chatService.receiveMessages().subscribe((message: any) => {
      console.log(message, "received message");
      this.messages.push(message);
    });

    this.getTechData(this.technicianId);
    this.getChats(this.Userid, this.technicianId);
  }

  getChats(userid: any, techid: any) {
    this.auth.getChatsbyIds(userid, techid).subscribe((response: any) => {
      console.log("Chats of the tech and user:", response);
      if (response && response.data) {
        this.messages = response.data;
        console.log(this.messages,"this is the this. messages")
      }
    });
  }
  showInputmodal(){

  }
  getTechData(techid: any) {
    this.auth.getOneTechbyId(techid).subscribe((response: any) => {
      
      if (response) {
        console.log("tech data ",response)
        this.technicianData = response.data.data;
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.technicianId) {
      const message = { 
        SenderId: this.Userid,
        SenderType: "user",
        content: this.newMessage,
        receiverId: this.technicianId
      };

      const chat = {
        techid: this.technicianId,
        userid: this.Userid,
        message: message   
      };

      this.chatService.sendMessage(chat, (response: any) => {
        console.log(response, "chat callback");
        response.SenderType = "user"; // Ensure the SenderType is set correctly
        this.messages.push(response);
        this.cdr.detectChanges(); // Trigger change detection
      });

      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

 

}
