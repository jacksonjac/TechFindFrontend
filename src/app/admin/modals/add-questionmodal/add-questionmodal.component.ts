import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';

@Component({
  selector: 'app-add-questionmodal',
  templateUrl: './add-questionmodal.component.html',
  styleUrls: ['./add-questionmodal.component.scss']
})
export class AddQuestionmodalComponent implements OnInit {

  questionForm: FormGroup;
  designations: string[] = []; // Add this property

  constructor(private fb: FormBuilder, private auth: AuthserviceService,private Toast:ToastService,private router:Router) {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s?]*$/)]],
      option1: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      option2: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      option3: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      correctAnswer: ['', Validators.required],
      designation: ['', Validators.required] // Add new form control
    });
  }

  ngOnInit() {
    this.fetchDesignations(); // Fetch designations on component initialization
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
      const formData = this.questionForm.value;
        console.log(formData,"this is stor")
      this.auth.NewQuestion(formData).subscribe(
        response => {
          this.Toast.showSuccess("Succesfully Added","Question Added Sucessfully")
          window.location.reload()
        },
        error => {
          console.error('Error saving question', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
