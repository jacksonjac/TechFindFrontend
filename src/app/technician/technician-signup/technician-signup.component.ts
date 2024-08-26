declare var google:any
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';

@Component({
  selector: 'app-technician-signup',
  templateUrl: './technician-signup.component.html',
  styleUrls: ['./technician-signup.component.scss']
})
export class TechnicianSignupComponent implements OnInit {

  designations: string[] = [];
  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    district: ['', [Validators.required]],
    workexp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    worklevel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    designation: ['', [Validators.required]],  // Changed from 'Designation' to 'designation'
    AadarNo: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]], // Aadhar number should be 12 digits
    PanNo: ['', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]], // PAN number format
    serviceCharge: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: this.passwordMatchValidator });

  constructor(private fb: FormBuilder, private techAuthService: TechAuthService, private router: Router, private auth: TechAuthService) {}

  ngOnInit(): void {
    this.fetchDesignations();
  }

  passwordMatchValidator(form: any) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (password !== confirmPassword) {
      form.get('confirmPassword').setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword').setErrors(null);
    }
  }

  fetchDesignations(): void {
    this.auth.getDesignations().subscribe(
      (response: { status: boolean; message: string; data: { _id: string; DesiName: string; __v: number; }[] }) => {
        console.log(response, "this data from frontend for getdesignation");
        if (response && Array.isArray(response.data)) {
          this.designations = response.data.map((item: { _id: string; DesiName: string; __v: number }) => item.DesiName);
        } else {
          console.error('Data is not an array', response.data);
        }
      },
      (error) => {
        console.error('Error fetching designations', error);
      }
    );
  }

  

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      this.techAuthService.registerTechnician(this.signupForm.value).subscribe(
        response => {
          console.log('Registration successful', response);        
         
          sessionStorage.setItem("Techid", response.id);
          sessionStorage.setItem('techotp', response.OTP);
          localStorage.setItem("techtoken", response.token);
          localStorage.setItem('techid', response.id);
          
          // Check if response.Data is defined and an object
          if (response.Data) {
            localStorage.setItem("TechData", JSON.stringify(response.Data));
            console.log('TechData stored in localStorage:', JSON.stringify(response.Data));
          } else {
            console.error('TechData is undefined or not an object');
          }
          
          // Navigate to the OTP page
          this.router.navigate(['/technician/otp-page']);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
