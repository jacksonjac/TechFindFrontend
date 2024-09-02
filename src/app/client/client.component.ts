import { Component, OnInit, HostBinding, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { UserAuthService } from '../Servies/Users/user-auth.service';
 import { fadeAnimation } from '../Servies/animations/animation.service';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoomidmodalComponent } from './modal/roomidmodal/roomidmodal.component';
import { NotificationsComponent } from './modal/notificationpage/notifications/notifications.component';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations:[fadeAnimation]
})
export class ClientComponent implements OnInit {
  
  Userid: string = "";
  dropdownOpen = false;
  userName = '';
  userEmail = '';
  imageurl ='https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
  animationState: string = 'fade';
  isLoading:boolean = false
  UserData: any = {};


  constructor(
    private auth: UserAuthService, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private modal: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.spinner.show()
   console.log("initial component ....")
   
   const UserId = localStorage.getItem("Userid");
   if(UserId){
    this.Userid = UserId
   }
  
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide();
    }, 2000);
  }

  loggedIn(): boolean {
    return this.auth.loggedIn();
  }



  logout(): void {
    this.auth.logoutUser();
  }

  toggleDropdown(): void {
    const UserId = localStorage.getItem("Userid");
    this.getUserData(UserId)
    this.dropdownOpen = !this.dropdownOpen;
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  showInputmodal(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      const dialogRef = this.modal.open(RoomidmodalComponent, dialogConfig);   
    
    }
    showNotificationPage(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      const dialogRef = this.modal.open(NotificationsComponent, dialogConfig);   

    }

    getUserData(userid:any) {
     
    
      this.auth.getOneUserbyId(userid).subscribe(
        (response: any) => {

          console.log('')
          if (response && response.data && response.data.data) {
            console.log("userdata", response.data);
    
            this.userName = response.data.data.name || 'Default User';
            this.imageurl = response.data.data.image || 'https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg';
          } else {
            console.warn('User data is not available');
          }
    
          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    }
    mobileMenuOpen = false;

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
 
}
