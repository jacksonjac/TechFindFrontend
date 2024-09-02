import { Component } from '@angular/core';
import { TechAuthService } from '../Servies/Technician/tech-auth.service';
 import { fadeAnimation } from '../Servies/animations/animation.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TechNotificationsComponent } from './modal/tech-notificationpage/tech-notifications/tech-notifications.component';
@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.scss']
})
export class TechnicianComponent {
  dropdownOpen = false;
  userName = 'Bonnie Green';
  
  imageurl ='https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'

  notificationcount:number=0
  constructor(private authService:TechAuthService, private modal: MatDialog,){}
ngOnInit(): void {
 
    
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
