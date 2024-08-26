import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserChatServicesService } from 'src/app/Servies/Users/chatService/chat-servies.service';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomidmodalComponent } from '../modal/roomidmodal/roomidmodal.component';
import { Socket } from 'socket.io-client';
@Component({
  selector: 'app-client-allchats',
  templateUrl: './client-allchats.component.html',
  styleUrls: ['./client-allchats.component.scss']
})
export class ClientAllchatsComponent implements OnInit, AfterViewInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  chatUsers: any[] = [];
  selectedUser: any;
  messages: any[] = [];
  newMessage: string = '';
  Userid: any;
  technicianData: any = {};
  messagebox:boolean=false
  seen :boolean = true
  private messageSubscription: Subscription | undefined;

  constructor(
    private chatService: UserChatServicesService,
    private auth: UserAuthService,
    private cdr: ChangeDetectorRef,
    private modal: MatDialog,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("allchatlist ngonint")
    this.Userid = localStorage.getItem('Userid');
    this.getChatUsers();
    this.scrollToBottom();
    this.messageSubscription = this.chatService.receiveMessages().subscribe((message: any) => {
      console.log("Received message:", message);
      
      this.messages.push(message);
      this.scrollToBottom();
    });
    this.messageSubscription = this.chatService.receiveSeenMessage().subscribe((message: any) => {
      console.log("seen message sucessfully", message);
      
      this.messages.push(message);
      this.scrollToBottom();
    });
    this.messageSubscription = this.chatService.receiveMessages().subscribe((message: any) => {
      console.log("Received message:", message);
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  ngAfterViewInit(): void {
    // Scroll to bottom initially after the view is initialized
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {

    this.scrollToBottom();
  }


  getChatUsers() {
    this.auth.getAllChatlistByid(this.Userid).subscribe((response: any) => {
      console.log(response, "this data from backend chatlist");
      if (response && response.data) {
        this.chatUsers = response.data;
      }
    });
    this.scrollToBottom();
  }

  selectUser(tech: any) {
    this.selectedUser = tech;
    this.getChats(this.Userid, tech);
    this.getTechData(tech);
    this.messagebox= true
    this.scrollToBottom();
    const senderType = 'technician'
    this.auth.markMessagesAsSeen(this.Userid, tech,senderType).subscribe(() => {
      this.messagebox = true;


      this.scrollToBottom();
      this.emitseen(this.Userid,tech)
    });
    this.getChats(this.Userid, tech);

  }

  emitseen(userid:string,techid:string){
     const viewedBy = 'user'
    const data ={
       userid,
       techid,
       viewedBy
    }

   this.chatService.seenEmit(data)

  }

  getTechData(techid: any) {
    this.auth.getOneTechbyId(techid).subscribe((response: any) => {
      if (response) {

        console.log("techdata",response.data.data.technician)

        this.technicianData = response.data.data.technician;
      }
    });
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }

  getChats(userid: any, techid: any) {
    this.auth.getChatsbyIds(userid, techid).subscribe((response: any) => {
      if (response && response.data) {

        console.log("chats data",response.data)
        this.messages = response.data;
        
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.technicianData._id) {
      const message = {
        SenderId: this.Userid,
        SenderType: "user",
        content: this.newMessage,
        receiverId: this.technicianData._id
      };

      const chat = {
        techid: this.technicianData._id,
        userid: this.Userid,
        message: message
      };

      this.chatService.sendMessage(chat, (response: any) => {
        response.SenderType = "user";
        this.messages.push(response);
        this.cdr.detectChanges();
      });

      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  showInputmodal(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.modal.open(RoomidmodalComponent, dialogConfig);
  
    
  
  }
}
