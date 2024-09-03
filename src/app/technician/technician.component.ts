import { Component } from '@angular/core';
import { TechAuthService } from '../Servies/Technician/tech-auth.service';
 import { fadeAnimation } from '../Servies/animations/animation.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TechNotificationsComponent } from './modal/tech-notificationpage/tech-notifications/tech-notifications.component';
import { NotificationService } from '../Servies/Users/NotificationService/notification.service';
import { ToastService } from '../Servies/Toster/toast-service.service';
@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.scss']
})
export class TechnicianComponent {
  dropdownOpen = false;
  userName = 'Bonnie Green';
  notificationcount: number = 0;
  imageurl ='https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'

  
  constructor(private authService:TechAuthService, private modal: MatDialog,private notifyService:NotificationService,private toaster:ToastService){}
  ngOnInit(): void {
  const techId = localStorage.getItem("techid");
  if(techId){
    
    this.notifyService.register(techId)
  }
    this.notifyService.receiveNotifications().subscribe((responce) => {
      
      this.notificationcount++;
     this.toaster.showSuccess('You have a Notification',"")
    
    });

    const TechId = localStorage.getItem('techid');
    if (TechId) {
      this.getTechData(TechId);
    }
 
  }
 

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.authService.logoutUser();
  }
  toggleDropdown(): void {
    const UserId = localStorage.getItem("techid");
    this. getTechData(UserId)
    this.dropdownOpen = !this.dropdownOpen;
  }

  showNotificationPage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.modal.open(TechNotificationsComponent, dialogConfig);   

  }
  getTechData(Techid:any) {
    
   
    this.authService.getOneTechbyId(Techid).subscribe(
      (response: any) => {

         this.notificationcount = response.data.data.notificationCount

        console.log("techdata",response.data.data.technician.name
        )
       this.userName = response.data.data.technician.name
       this.imageurl = response.data.data.technician.image || 'https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg';
      },
      (error: any) => {
        console.error('Failed to fetch technician data:', error);
      }
    );
  }
}
