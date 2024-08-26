import { Component,ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TechChatserviceService } from 'src/app/Servies/Technician/ChatService/chatservice.service';
import { ActivatedRoute } from '@angular/router';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoomidmodalComponent } from 'src/app/client/modal/roomidmodal/roomidmodal.component';
import { CreateroomComponent } from '../modal/createRoom/createroom/createroom.component';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  Userid = ''
  technicianId: any;
  messagebox:boolean=false
  
  chatUsers: any[] = [];
  selectedUser: any;
  messages: any[] = [];
  newMessage: string = '';
 
  UsernData: any = {}; // Initialize as an empty object

  private messageSubscription: Subscription | undefined;

  constructor(private chatService: TechChatserviceService,
    private route:ActivatedRoute,
    private modal: MatDialog,
    private auth:TechAuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
   this.technicianId = localStorage.getItem('techid');
    if (this.technicianId) {
      this.chatService.register(this.technicianId);

    }
    this.messageSubscription = this.chatService.receiveMessages().subscribe((message: any) => {
        console.log("this is the data of technician get firsttime",message.senderId
        )
      this.Userid = message.SenderId
      this.messages.push(message);
     
      
    });

    this.messageSubscription = this.chatService.receiveSeenMessage().subscribe((message: any) => {
      console.log("seen message sucessfully", message);
      
      this.messages.push(message);
     
    });

    this.getChatUsers(this.technicianId)
   
  }

  ngAfterViewInit(): void {
    // Scroll to bottom initially after the view is initialized
    // this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    // Ensure the scroll happens after each view check
   
  }

  getChatUsers(techid:any) {
    console.log(techid,"this is the technician id  for get thechatlist")
    this.auth.getAllChatlistByid(techid).subscribe((response: any) => {
      console.log(response, "this data from backend chatlist");
      
      if (response && response.data) {
        this.chatUsers = response.data;
      }
    });
  }

  selectUser(Userid: any) {
    console.log("This is the user selected Userid", Userid, "end");
    this.selectedUser = Userid;
    this.getChats(Userid, this.technicianId);
    this.getUserData(Userid);
    this.messagebox = true;
    
    // Define the sender type as 'user'
    const senderType = 'user';
  
    // Call the method to mark messages as seen
    this.auth.markMessagesAsSeen(Userid, this.technicianId, senderType).subscribe(() => {
      this.messagebox = true;
      this.scrollToBottom();
      this.emitseen(Userid,this.technicianId)
    });
  }

  emitseen(userid:string,techid:string){
    const viewedBy = 'technician'
   const data ={
      userid,
      techid,
      viewedBy
   }

  this.chatService.seenEmit(data)

 }
  showInputmodal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { email: this.UsernData.email };
    localStorage.setItem('userEmailtovideocall',this.UsernData.email)
    const dialogRef = this.modal.open(CreateroomComponent, dialogConfig);
    
  }
  getChats(userid: any, techid: any) {
    console.log("this is the ids gonna pass ", userid, "--", techid);
    this.auth.getChatsbyIds(userid, techid).subscribe((response: any) => {
      console.log("this is the response form getchats", response);

      if (response && response.data) {
        this.messages = response.data;
        console.log(this.messages, "this is the current message list of clicked tech");
      }
    });
  }

  getUserData(Userid: any) {
    this.auth.getOneUserbyId(Userid).subscribe((response: any) => {
      if (response) {
        console.log("Use data ", response);
        this.UsernData = response.data.data;
      }
    });
  }
  ngOnChanges() {
   
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.UsernData._id) {
      const message = { 
        SenderId: this.technicianId,
        SenderType: "technician", // Adjusting the role to technician
        content: this.newMessage,
        receiverId: this.UsernData._id // This should be the user's ID
      };

      const chat = {
        techid: this.technicianId, // This should be the technician's ID
        userid: this.UsernData._id, // This should be the user's ID
        message: message   
      };

      this.chatService.sendMessage(chat, (response: any) => {
        console.log(response, "chat callback");
        response.SenderType = "technician"; // Ensure the SenderType is set correctly
        this.messages.push(response);
        this.cdr.detectChanges();
        // this.scrollToBottom(); // Trigger change detection
      });

      this.newMessage = '';
    }
  }
  private scrollToBottom(): void {
    console.log("scroll is worked")
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
