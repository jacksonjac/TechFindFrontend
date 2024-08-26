import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-client-otp',
  templateUrl: './client-otp.component.html',
  styleUrls: ['./client-otp.component.scss']
})
export class ClientOtpComponent implements OnInit, OnDestroy {

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
          sessionStorage.removeItem('otp');
          localStorage.removeItem("token")  // Clear the OTP from session storage
          console.log('OTP expired');
          this.toastService.showError('OTP has expired', 'Please request a new OTP.');
          this.router.navigate(['/signup']);
        }
      }
    });
  }

  submitOtp(): void {
    if (this.otp) {
      const storedOtp = sessionStorage.getItem('otp');
      const trimmedOtp = this.otp.trim();
      if (storedOtp) {
        if (storedOtp.trim() === trimmedOtp) {
          console.log('OTP verified successfully');
          this.toastService.showSuccess('Welcome Home', 'Successfully verified');
          // Clear the OTP from session storage after verification
          sessionStorage.removeItem('otp');
          // Redirect to the desired page
          this.router.navigate(['techlist']);
        } else {
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
