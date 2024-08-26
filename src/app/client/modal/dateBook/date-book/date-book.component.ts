import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

@Component({
  selector: 'app-date-book',
  templateUrl: './date-book.component.html',
  styleUrls: ['./date-book.component.scss']
})
export class DateBookComponent implements OnInit {
  availableSlots: any[] = [];
  selectedDate: Date | undefined;
  selectedSlot: any;
  noAvailableSlots: boolean = false;
  minDate: Date;
  disabledDates: Date[] = [];

  constructor(
    private userAuthService: UserAuthService,
    private toaster: ToastService,
    private router: Router,
    private dialogRef: MatDialogRef<DateBookComponent>,
  ) {
    this.minDate = new Date(); // Set the minimum selectable date to today
  }

  ngOnInit() {
    let techid = localStorage.getItem('Temb-tech_id');
    if (techid) {
      this.fetchAvailableSlots(techid);
    } else {
      console.error('Technician ID not found in local storage.');
    }
  }

  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.selectedSlot = this.availableSlots.find(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.toDateString() === date.toDateString();
    }) || null;
  }

  selectSlot(slot: any) {
    this.selectedSlot = slot;
  }

  fetchAvailableSlots(techid: any) {
    this.userAuthService.getSlots(techid).subscribe(
      (response: any) => {
        console.log("Response from backend fetch slots:", response);
        if (response.data === null || response.data.length === 0) {
          this.noAvailableSlots = true;
        } else {
          this.availableSlots = response.data.filter((slot: any) => {
            const slotDate = new Date(slot.date);
            return !slot.booked && slotDate >= this.minDate;
          });
          this.noAvailableSlots = this.availableSlots.length === 0;
        }
  
        if (this.noAvailableSlots) {
        
        } else {
          this.setDisabledDates();
        }
        localStorage.removeItem('Temb-tech_id');
      },
      error => {
        console.error('Error fetching slots:', error);
        this.toaster.showError('Error fetching slots. Please try again later.', '');
      }
    );
  }

  setDisabledDates() {
    const allDates = Array.from({ length: 31 }, (_, i) => new Date(2024, 6, i + 1));
    const availableDates = this.availableSlots.map(slot => new Date(slot.date));
    this.disabledDates = allDates.filter(date => !availableDates.some(availableDate => availableDate.getTime() === date.getTime()));
  }

  getDateClass(date: any, disabled: boolean): string {
    const currentDate = new Date(date.year, date.month, date.day);
    const isAvailable = this.availableSlots.some(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.getDate() === currentDate.getDate() &&
             slotDate.getMonth() === currentDate.getMonth() &&
             slotDate.getFullYear() === currentDate.getFullYear();
    });
    if (disabled) {
      return 'text-gray-400';
    }
    if (isAvailable) {
      return 'text-green-500';
    }
    return '';
  }

  proceedToPay() {
    if (this.selectedSlot) {
      const userId = localStorage.getItem('Userid'); 
      if (!userId) {
        this.toaster.Info("User ID not found. Please log in again.", "");
        return;
      }

      const slotDataWithUser = {
        ...this.selectedSlot,
        userId: userId
      };

      console.log("Passing data:", slotDataWithUser);

      this.userAuthService.UserAddNewSlot(slotDataWithUser).subscribe(
        (response: any) => {
          console.log("Received response:", response);
          if (response && response.status) {
            console.log("Technician details:", response.technician);
            console.log("this is the booked slot details", this.selectedSlot);
            localStorage.setItem('tech-data', JSON.stringify(response.technician));
            localStorage.setItem('slot-data', JSON.stringify(this.selectedSlot));

            this.dialogRef.close();
            this.router.navigate(['/paymentmethod']);
          } else {
            this.toaster.Info(response.message || "Error booking slot. Please try again later.", "");
          }
        },
        error => {
          console.error('Error adding new slot:', error);
          this.toaster.Info("Error booking slot. Please try again later.", "");
        }
      );
    } else {
      this.toaster.Info("Please select a slot before proceeding", "");
    }
  }
}
