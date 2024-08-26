import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-tech-addslot',
  templateUrl: './tech-addslot.component.html',
  styleUrls: ['./tech-addslot.component.scss']
})
export class TechAddslotComponent {
  Techlist: any[] = [];
  formGroup: FormGroup;
  today = new Date();
  minTime: string;
  dateSelected = false;

  constructor(
    private fb: FormBuilder,
    private auth: TechAuthService,
    private cdr: ChangeDetectorRef,
    private toaster: ToastService
  ) {
    this.formGroup = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      techId: [localStorage.getItem('techid')]
    });

    this.today.setHours(0, 0, 0, 0);
    this.minTime = this.getCurrentTime();
  }

  ngOnInit(): void {
    const TechId = localStorage.getItem('techid');
    this.getSlots(TechId);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const selectedDate = this.formGroup.get('date')!.value;
  
      // Convert selectedDate to a comparable format
      const selectedDateTime = new Date(selectedDate).setHours(0, 0, 0, 0); // Remove time part
      const currentDateTime = new Date().setHours(0, 0, 0, 0); // Remove time part from current date
  
      // Check if the selected date is in the future
      if (selectedDateTime <= currentDateTime) {
        this.toaster.showError('Please select a future date.', 'Invalid Date');
        return; // Stop submission if the date is not in the future
      }
  
      // Check if there's already a slot for the selected date
      const selectedDateString = new Date(selectedDate).toISOString().split('T')[0];
      const existingSlot = this.Techlist.find(slot => {
        const slotDateString = new Date(slot.date).toISOString().split('T')[0];
        return slotDateString === selectedDateString;
      });
  
      if (existingSlot) {
        this.toaster.showError('A slot has already been booked for the selected date.', 'One slot only allowed per day');
        return; // Stop submission if a slot already exists for the selected date
      }
  
      // Proceed with slot creation
      this.auth.AddNewSlot(this.formGroup.value).subscribe((response) => {
        this.toaster.showSuccess('Slot added successfully', '');
        this.formGroup.reset();
        const TechId = localStorage.getItem('techid');
        this.getSlots(TechId);
        
        this.formGroup.get('techId')!.setValue(TechId);
        this.cdr.detectChanges();
      });
    } else {
      this.toaster.showError("select the slot time",'')
      this.formGroup.markAllAsTouched();
    }
  }
  
  getSlots(techId: any) {
    this.auth.getSlots(techId).subscribe(
      (response: any) => {
        if (response.status) {
          this.Techlist = response.data;
          console.log('slot data',response.data)
          
        } else {
          console.error('Error fetching user list:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching user list:', error);
      }
    );
  }

  cancelSlot(id: any) {
    this.toaster.confirm("Are you sure?", "Do you want to cancel this slot?").subscribe(confirmed => {
      if (confirmed) {
        this.auth.CanselSlot(id).subscribe(
          (response) => {
            this.toaster.showSuccess('Slot deleted successfully', '');
            const TechId = localStorage.getItem('techid');
            this.getSlots(TechId);
            this.cdr.detectChanges();
          },
          (error) => {
            this.toaster.showError('Failed to cancel slot', error.message);
          }
        );
      }
    });
  }

  getCurrentTime(): string {
    const now = new Date();
    return `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  onDateSelect() {
    this.dateSelected = true;
  }

  getSlotStatus(slotDate: Date, booked: boolean): string {
    const now = new Date();
    if (booked) {
      return 'Booked';
    } else if (new Date(slotDate) < now) {
      return 'Expired';
    } else {
      return 'Pending';
    }
  }
}
