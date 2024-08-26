import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss']
})
export class AddDesignationComponent {

  designationForm: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthserviceService,private Toast:ToastService,private router:Router) {
    this.designationForm = this.fb.group({
      designation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]]
    });
  }
  @Output() designationAdded = new EventEmitter<void>(); 
  onSubmit() {
    if (this.designationForm.valid) {
      // Extract form values
      const designationData = this.designationForm.value;

      // Call the service method to post data to backend
      this.auth.NewDesignation(designationData)
        .subscribe(
          (response) => {
            this.Toast.showSuccess("Successfully Added", "Designation Added Successfully");
            this.designationAdded.emit();  // Emit event to notify parent
            this.router.navigate(["admin/Designationlist"]);
          },
          (error) => {
            console.error('Error adding new designation:', error);
            // Handle error scenarios if needed
          }
        );
    } else {
      console.error('Form is invalid');
      // Handle invalid form state if needed
    }
  }

}
