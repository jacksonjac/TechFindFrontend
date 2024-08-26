import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-technician-otp',
  templateUrl: './technician-otp.component.html',
  styleUrls: ['./technician-otp.component.scss']
})
export class TechnicianOtpComponent {

  otp: string = '';
  timerSubscription!: Subscription;
  minutes: number = 1;
  seconds: number = 0;

  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  startTimer(): void {
    const timer$ = interval(1000);
    this.timerSubscription = timer$.subscribe(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.timerSubscription.unsubscribe();
          // Handle OTP expiration
          sessionStorage.removeItem('otp');  // Clear the OTP from session storage
          console.log('OTP expired');
          this.toastService.showError('OTP has expired', 'Please request a new OTP.');
          this.router.navigate(['/signup']);
        }
      }
    });
  }

  submitOtp(): void {
    if (this.otp) {
      const storedOtp = sessionStorage.getItem('techotp');
      const trimmedOtp = this.otp.trim();
      if (storedOtp) {
        if (storedOtp.trim() === trimmedOtp) {
          console.log('OTP verified successfully');
          this.toastService.showSuccess('Welcome FindTech', "");
          // Clear the OTP from session storage after verification
          sessionStorage.removeItem('techotp');
          // Redirect to the desired page
          this.router.navigate(['/technician/tech-home']);
        } else {
          localStorage.removeItem("techtoken");
          localStorage.removeItem('techid');
          

          console.error(`Invalid OTP. Entered: ${trimmedOtp}, Stored: ${storedOtp.trim()}`);
          this.toastService.showError('Invalid OTP', 'Please check the OTP and try again');
        }
      } else {
        console.error('No OTP found in session storage.');
        this.toastService.showError('Invalid OTP', 'No OTP found in session storage');
      }
    } else {
      console.error('OTP is required');
      this.toastService.showError('OTP is required', 'Please enter the OTP');
    }
  }

}
