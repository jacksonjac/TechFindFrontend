declare var google: any;

import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import {TechAuthService} from 'src/app/Servies/Technician/tech-auth.service'

@Component({
  selector: 'app-technician-login',
  templateUrl: './technician-login.component.html',
  styleUrls: ['./technician-login.component.scss']
})
export class TechnicianLoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]]
  });
  constructor(
    private fb: FormBuilder,
    private auth: TechAuthService,
    private toastService: ToastService,
    private router: Router,
    private ngZone: NgZone
  ) {}



  
  onSubmit() {
    if (this.loginForm.valid) {
      const UserData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
  
      this.auth.loginTechnician(UserData as any).subscribe(
        (response: any) => {

          if (response && response.status) {
            console.log("logindatatech", response);




            localStorage.setItem('techtoken', response.token);
            localStorage.setItem('techid', response.data._id);
            localStorage.setItem('techemail', response.data.email);
            localStorage.setItem('techName',response.data.name)
           
            
            this.toastService.showSuccess('Login Successful', 'Welcome to the Technicians List!');
            this.router.navigate(['/technician/tech-home']); // Ensure correct path format
          } else {
            this.toastService.showError('Login Failed', response.message || 'Please check your credentials.');
          }
        },
        error => {
          console.log("Error during login:", error);
          this.toastService.showError('Error', 'An error occurred during login.');
        }
      );
    }
  }

}
