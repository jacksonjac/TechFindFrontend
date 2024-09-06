import { Component } from '@angular/core';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

@Component({
  selector: 'app-clientprofilepage',
  templateUrl: './clientprofilepage.component.html',
  styleUrls: ['./clientprofilepage.component.scss']
})
export class ClientprofilepageComponent {

  selectedFile: File | null = null;
  UserData: any = {};

  constructor(private auth: UserAuthService,private toaster:ToastService) {}

  ngOnInit(){
     this.getUserData();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      const techId = localStorage.getItem("Userid");
      this.auth.uploadImage(formData, techId).subscribe(
        (response:any) => {

          console.log("image sucessfully")
            this.toaster.showSuccess('Image upload sucessfully','')
            
          this.UserData = response.data;
        },
        (error: any) => {
          console.error('Image upload failed:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }

  getUserData() {
    const UserId = localStorage.getItem("Userid");
   
    this.auth.getOneUserbyId(UserId).subscribe(
      (response: any) => {

        console.log("userdata",response)
        this.UserData = response.data;
      },
      (error: any) => {
        console.error('Failed to fetch technician data:', error);
      }
    );
  }
  updateUserProfile() {
    const updatedData = {
      name: this.UserData.data.name,
      district: this.UserData.data.district,
      email: this.UserData.data.email,
      phone: this.UserData.data.phone,
    };
    
    const UserId = localStorage.getItem("Userid");
    if(UserId){
      this.auth.updateUserProfile(UserId, updatedData).subscribe(
        (response: any) => {

          console.log(response,"the responce from backend")
          console.log("Profile updated successfully", response);
          this.toaster.showSuccess('Profile updated successfully', '');
          this.UserData = response.data; // Update the local user data with the response
        },
        (error: any) => {
          console.error('Profile update failed:', error);
        }
      );
    }

    }
    

  }

 
