import { Component, OnInit } from '@angular/core';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-tech-profile',
  templateUrl: './tech-profile.component.html',
  styleUrls: ['./tech-profile.component.scss']
})
export class TechProfileComponent implements OnInit {
  selectedFile: File | null = null;
  techData: any = {};

  constructor(private auth: TechAuthService,private toaster:ToastService) {}

  ngOnInit(): void {
    this.getTechData();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      const techId = localStorage.getItem("techid");
      this.auth.uploadImage(formData, techId).subscribe(
        (response:any) => {

          console.log("image sucessfully")
            this.toaster.showSuccess('Image upload sucessfully','')
            
          this.techData = response.data;
        },
        (error: any) => {
          console.error('Image upload failed:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
  updateTechProfile(){

  }
  getTechData() {
    const techId = localStorage.getItem("techid");
    this.auth.getOneTechbyId(techId).subscribe(
      (response: any) => {
        console.log('techdata',response.data.data.technician.image)
        this.techData = response.data.data.technician
      },
      (error: any) => {
        console.error('Failed to fetch technician data:', error);
      }
    );
  }
}
