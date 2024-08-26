import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-tech-notifications',
  templateUrl: './tech-notifications.component.html',
  styleUrls: ['./tech-notifications.component.scss']
})
export class TechNotificationsComponent implements OnInit{
  Notifications: any[] = [];

  constructor(private authService: TechAuthService,private toaster:ToastService, private cdr: ChangeDetectorRef){} // Inject ChangeDetectorRef) {}

  ngOnInit(): void {
    const techid = localStorage.getItem('techid');
    if (techid) {
      this.getAllNotificationsById(techid);
    }
  }

  getAllNotificationsById(id: string): void {
    this.authService.getNotificationsByTechId(id).subscribe(
      (response: any) => {
        console.log("Response of get all notifications:", response);
        if (response.status) {
          this.Notifications = response.data;
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
          this.toaster.showSuccess('Notification removed successfully',"");
          if (this.Notifications.length === 0) {
            this.toaster.Info('Currently no notifications','');
          }
        } else {
          console.error('Failed to remove notification:', response.message);
        }
      },
      (error) => {
        console.error('Error removing notification:', error);
      }
    );
  }
  clearAllNotifications(): void {
    const techid = localStorage.getItem('techid');
    if (techid) {
      this.authService.clearNotificationsByTechId(techid).subscribe(
        (response: any) => {
          if (response.status) {
            this.Notifications = [];
            this.toaster.showSuccess('All notifications cleared successfully',"");
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
  
}
