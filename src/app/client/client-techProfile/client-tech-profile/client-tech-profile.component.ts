import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';
import { DateBookComponent } from '../../modal/dateBook/date-book/date-book.component';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { UserChatServicesService } from 'src/app/Servies/Users/chatService/chat-servies.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/Servies/Users/NotificationService/notification.service';

@Component({
  selector: 'app-client-tech-profile',
  templateUrl: './client-tech-profile.component.html',
  styleUrls: ['./client-tech-profile.component.scss']
})
export class ClientTechProfileComponent implements OnInit {
  value: number | undefined
  avgvalue=0
  technician: any;
  comments: any[] = [];
  isFormValid = false;
  userId = ""
  Rcount = 0
  liked: boolean = false;
  likeCount: number = 0;
  private messageSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute, private auth:UserAuthService,
    private modal: MatDialog,private cdr: ChangeDetectorRef,
    private router:Router,private toaster:ToastService,
    private NofiService:NotificationService,
   
  
  ) {}

  newComment: any = {
    content: '',
    ratingValue: 0
  };

  validateForm() {
    this.isFormValid = this.newComment.content.trim() !== '' && this.newComment.ratingValue > 0;
  }
  ngOnInit(): void {

   const userid = localStorage.getItem('Userid')
   if(userid){
    this.userId = userid
   }

    const id = this.route.snapshot.paramMap.get('id');
     if(id){

       this.fetchTechnicianDetails(id)
     }else{
      console.log("id not found")
     }

     this.getComments(id)

    //  this.NofiService.receiveNotifications().subscribe(notification => {
    //   console.log(notification,"this is recevided status of the notification")
      
    //   if(notification.status){
       
    //   }
    //   // Handle the notification (e.g., display a toast or update the UI)
    // });
  }
  

  chatpage(id: any): void {
    console.log(id, "this is the technician id");
    this.router.navigate(['/chatpage', id]); // Navigate to the chat page with the technician's ID
  }
  addComment(techid: any) {
    const commentData = {
      technicianId: techid,
      commenterId: this.userId,
      date: new Date(),
      content: this.newComment.content,
      ratingValue: this.newComment.ratingValue
    };
  
    this.auth.addComment(commentData).subscribe(
      response => {
        console.log("Response of add comment function:", response);
        this.toaster.showSuccess("Comment Added Successfully", "");
  
        // Clear the comment and rating fields
        this.newComment = { content: '', ratingValue: 0 };
        this.isFormValid = false; // Optional: Disable the button after resetting the form
  
        // Fetch updated comments
        this.getComments(techid);
      },
      error => {
        console.error("Error adding comment:", error);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
  toggleLike(): void {
    this.liked = !this.liked;
    this.likeCount += this.liked ? 1 : -1;
    console.log("like clicked");
  
    const userName = localStorage.getItem('UserName');
  
    if (this.technician._id && userName) {
      if (this.liked) {  // Emit notification only when liked
        const likeNotification = {
          senderid: this.userId,
          receiverId: this.technician._id,
          content: `${userName} liked your profile.`,
          date: new Date()
        };
  
        // Use Socket.IO for sending notification
        this.NofiService.sendNotification(likeNotification, (response: any) => {
          console.log('Notification response:', response);
          if (response.status) {
            this.toaster.showSuccess("Liked Successfully", "");
            this.fetchTechnicianDetails(this.technician._id); 
           
          } else {
            this.toaster.showError("Already Liked", "Already liked");
            this.liked = !this.liked; // Revert like state
            this.likeCount += this.liked ? 1 : -1; // Revert like count
          }
          this.cdr.detectChanges(); // Refresh the view
        });
      }
    }
  }
  getComments(techid: any) {
    this.auth.getCommentsByTechid(techid).subscribe((response:any) => {
      if (response.status) {
        console.log("the reponse of the getcomments fuction",response)
        this.comments = response.data;
        this.avgvalue = response.averageRating
        this.Rcount = response.commentCount
        // Update the comments array with fetched data
      } else {
        console.error("Failed to fetch comments:", response.message);
      }
    }, error => {
      console.error("Error fetching comments:", error);
    });
  }
  fetchTechnicianDetails(id: string): void {
    this.auth.getOneTechbyId(id).subscribe((data:any) => {

      console.log("techdetails page data",data.data.data.technician)
      if(data.status){

        this.technician = data.data.data.technician;
      }
    });
  }
showAppoimentmodal(id:any){
  localStorage.setItem('Temb-tech_id',id)

 const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  const dialogRef = this.modal.open(DateBookComponent, dialogConfig);

  

}


}
