import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-meetingschedule',
  templateUrl: './meetingschedule.component.html',
  styleUrls: ['./meetingschedule.component.scss']
})
export class MeetingscheduleComponent {

  scheduleForm: FormGroup;
  UsersList: any[] = [];
  dropdownOpen: boolean = false;
  selectedUser: any = null;

  constructor(private fb: FormBuilder,
     private authService: TechAuthService,
    private toaster: ToastService) {
    this.scheduleForm = this.fb.group({
      userId: ['', Validators.required],
      technicianId: ['', Validators.required],
      meetingDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      videoCallLink: [{ value: '', disabled: false }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.setTechnicianId();
  }

  setTechnicianId(): void {
    const techId = localStorage.getItem('techid'); // Retrieve the technician ID from localStorage
    if (techId) {
      this.scheduleForm.get('technicianId')?.setValue(techId); // Set the technicianId form control value
    }
  }

  loadUsers(): void {
    this.authService.Userlist().subscribe(
      (response: any) => {
        if (response.status) {
          this.UsersList = response.data;
        } else {
          console.error('Error fetching users:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  generateLinkId(): void {
    const randomId = Math.random().toString(36).substring(2, 15);
    this.scheduleForm.get('videoCallLink')?.setValue(randomId);
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      console.log("form data",this.scheduleForm.value)
      this.authService.scheduleMeeting(this.scheduleForm.value).subscribe(response => {
        console.log('Meeting scheduled:', response);
        this.toaster.showSuccess('Added Successfully','')
      });
    } else {
      console.log('Form is invalid');
    }
    this.scheduleForm.reset()
  }



  viewMeetings() {
    // Implement logic to navigate to view meetings page
    console.log('View Meetings button clicked');
  }


}
