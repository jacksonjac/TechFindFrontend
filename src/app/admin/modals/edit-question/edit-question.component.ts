import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent {
  questionForm: FormGroup;
  designations: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthserviceService,
    private toastService: ToastService
  ) {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s?]*$/)]],
      option1: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      option2: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      option3: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      correctAnswer: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize form with passed data
    this.questionForm.patchValue(this.data.question.data.data);

    // Fetch designations and set the selected designation
    this.fetchDesignations()
    

    // Set the correct answer value
    this.questionForm.patchValue({ correctAnswer: this.data.question.data.data.correctAnswer });
  }

  fetchDesignations(): void {
    this.auth.getDesignations().subscribe(
      (response: { status: boolean; message: string; data: { _id: string; DesiName: string; __v: number; }[] }) => {
        console.log(response, "this data from frontend for getdesignation");
        // Extract the data array from the response
        if (response && Array.isArray(response.data)) {
          this.designations = response.data.map((item: { _id: string; DesiName: string; __v: number }) => item.DesiName); // Extract DesiName from each item
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
    if (this.questionForm.valid) {
      console.log("Form values before submit:", this.questionForm.value,"id",this.data.question.data.data._id); // Log form values before submit
      this.auth.UpdateQuestion(this.data.question.data.data._id, this.questionForm.value).subscribe(
        (response: any) => {

          if(response.status){
            console.log(response,"responce form backend")

            this.toastService.showSuccess('Question updated successfully', 'Success');
            this.dialogRef.close(true); // close dialog with success response
          }
        },
        (error: any) => {
          this.toastService.showError('Failed to update question', 'Error');
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
