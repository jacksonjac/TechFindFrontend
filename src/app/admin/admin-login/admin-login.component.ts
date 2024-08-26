import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private authService:AuthserviceService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Create the data object
      const data = {
        email,
        password
      };
  
      // Call AuthService login method
      this.authService.loginAdmin(data).subscribe(
        (responce:any) => {

          
          localStorage.setItem("admintoken",responce.token)


          // Handle successful login
          this.toastService.showSuccess('Admin loggin Sucessfully', 'WELCOME ADMIN');
          this.router.navigate(['/admin/adminhome']); // Navigate to dashboard or desired route
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          this.toastService.showError('Login Failed', 'Invalid email or password.'); // Example of using a toast service for error message
        }
      );
    } else {
      // Form is invalid, show error messages if necessary
      // This block may not be necessary if form validity is handled in the template
    }
  }

  
}
