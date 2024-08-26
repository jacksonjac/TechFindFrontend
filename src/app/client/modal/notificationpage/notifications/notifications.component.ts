import { ChangeDetectorRef, Component } from '@angular/core';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {


  
  Notifications: any[] = [];
  display: boolean = false;
  selectedNotification: any = null;

  constructor(
    private authService: TechAuthService,
    private toaster: ToastService,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) {}

  ngOnInit(): void {
    const techid = localStorage.getItem('Userid');
    if (techid) {
      this.getAllNotificationsById(techid);
    }
  }

  getAllNotificationsById(id: string): void {
    this.authService.getNotificationsByTechId(id).subscribe(
      (response: any) => {
        if (response.status) {

          console.log(response.data,"notification data")
          this.Notifications = response.data;
          this.cdr.detectChanges(); // Trigger change detection
        } else {
          console.error('Failed to fetch notifications:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  removeNotification(notification: any): void {
    this.authService.deleteNotification(notification._id).subscribe(
      (response: any) => {
        if (response.status) {
          this.Notifications = this.Notifications.filter(n => n._id !== notification._id);
          this.toaster.showSuccess('Notification removed successfully', "");
          if (this.Notifications.length === 0) {
            this.toaster.Info('Currently no notifications', '');
          }
          this.cdr.detectChanges(); // Trigger change detection
        } else {
          console.error('Failed to remove notification:', response.message);
        }
      },
      (error) => {
        console.error('Error removing notification:', error);
      }
    );
  }
  showTechDetails(id:string){
  
   
     this.router.navigate(["/TechDetatils",id])
  }

  clearAllNotifications(): void {
    const techid = localStorage.getItem('techid');
    if (techid) {
      this.authService.clearNotificationsByTechId(techid).subscribe(
        (response: any) => {
          if (response.status) {
            this.Notifications = [];
            this.toaster.showSuccess('All notifications cleared successfully', "");
            this.cdr.detectChanges(); // Trigger change detection
          } else {
            console.error('Failed to clear notifications:', response.message);
          }
        },
        (error) => {
          console.error('Error clearing notifications:', error);
        }
      );
    }
  }

  showMore(notification: any): void {
    this.selectedNotification = notification;
    this.display = true;
  }
}
