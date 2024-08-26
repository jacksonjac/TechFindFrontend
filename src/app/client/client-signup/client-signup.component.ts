declare var google:any

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInterface } from 'src/app/Interface/Users/user-interface';

import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';


@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.scss'],
  
})
export class ClientSignupComponent implements OnInit{
  cities: string[] = [];
  fetchedCity: string|undefined
  constructor(private fb: FormBuilder ,
    private auth:UserAuthService,
    private toastService: ToastService,
    private router:Router,
    ) {}


    ngOnInit(): void {
      google.accounts.id.initialize({
        client_id: '1096596892716-ogub7mk17mvh4mus97tdcmkc87r82m2p.apps.googleusercontent.com',
        callback: (response: any) => this.handleLogin(response)
      });
  
      google.accounts.id.renderButton(document.getElementById("SignUp-btn"), {
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular'
      });
    }
  
    private decodeToken(token: string): any {
      try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
  
    handleLogin(response: any): void {
      if (response) {
        console.log(response,"responce form google")
        const payload = this.decodeToken(response.credential);
        if (payload) {
          const UserData: any = {
            name: payload.name,
            email: payload.email,
            phone: "", // If phone is not provided by Google, set it empty
            district: '', // If district is not provided by Google, set it empty
            password: "1234" // Using Google user ID as a password placeholder
             };
             console.log(UserData,"datafrom font end")
          this.auth.GoogleregisterUser(UserData)
            .subscribe((response: any) => {
              console.log("google login respons signup  page",response)
              if (response && response.status) {
                 
                localStorage.setItem('token', response.token);
            localStorage.setItem('Userid', response.data._id);
            localStorage.setItem('email', response.data.email);
                this.toastService.showSuccess('Registration Successful', 'Welcome to the FindTech!');
                this.router.navigate(['techlist']);
              } else {

                alert("alredy email exits")

                console.log("else case of signu")
                this.toastService.showError('Registration Failed', response.message || 'Unable to register your account.');
              }
            }, error => {
              console.log("Error during registration:", error);
              this.toastService.showError('Error', 'An error occurred during registration.');
            });
        } else {
          this.toastService.showError('Registration Failed', 'Invalid registration response.');
        }
      }
    }












    
  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    district: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: this.passwordMatchValidator });
  messageService: any;

  

  passwordMatchValidator(form: any) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (password !== confirmPassword) {
      form.get('confirmPassword').setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword').setErrors(null);
    }
  }

  fetchLocation(): void {
    this.auth.getlocation().subscribe(
      (response) => {
        console.log(response.city); // Assuming response.city is the city name fetched
        this.fetchedCity = response.city; // Store fetched city in a component property
        this.signupForm.patchValue({
          district: response.city // Set the fetched city to the 'district' form control
        });
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const UserData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        phone: this.signupForm.value.phone,
        district: this.signupForm.value.district,
        password: this.signupForm.value.password
      };
  
      this.auth.registerUser(UserData).subscribe(
        (response: any) => {
          console.log(response, "this is the response");
  
          if (response && response.status === true) {
            console.log('OTP:', response.OTP || 'No OTP provided');
            console.log('Access Token:', response.AcessToken || 'No Access Token provided');          
  
            if (response.id) {
              console.log('Response ID:', response.id);
            } else {
              console.warn('Response ID is missing');
            }
  
            if (response.Data) {
              console.log('Response User ID:', response.Data.id || 'No ID in data');
              console.log('Response User _id:', response.Data.data._id || 'No _id in data');
              localStorage.setItem('Userid',response.Data.data._id);
            } else {
              console.warn('Response data is missing');
            }
  
            // Store OTP and user information in session/local storage
            if (response.OTP) {
              sessionStorage.setItem('otp', response.OTP);
            }
            if (response.AcessToken) {
              localStorage.setItem('accessToken', response.AcessToken);
            }
            if (response.Data.id) {
              localStorage.setItem('Userid', response.Data.id);
            }
  
            this.toastService.showSuccess('Data Added Successfully', '6 digit OTP sent to your Email');
            this.router.navigate(['otppage']);
          } else {
            console.error("Error:", response?.message || 'Unknown error');
            this.toastService.showError("Error", response?.message || 'Unknown error');
          }
        },
        (error) => {
          console.error('Request Error:', error);
        }
      );
    }
  }


   
}
