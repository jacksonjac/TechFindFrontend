import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddQuestionmodalComponent } from '../modals/add-questionmodal/add-questionmodal.component';
import { EditQuestionComponent } from '../modals/edit-question/edit-question.component';
@Component({
  selector: 'app-tech-questions',
  templateUrl: './tech-questions.component.html',
  styleUrls: ['./tech-questions.component.scss']
})
export class TechQuestionsComponent implements OnInit{
  designations: any[] = [];
  selectedDesignation: any;
  showDropdown = false;
  searchText=""
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  p: number = 1;

  Techlist = [
    { _id: 1, question: 'What is the full form of IMEI?', designation: 'Mobile Tech', option1: 'International Mobile Equipment Identifier', option2: 'Option 2', option3: 'Option 3', correctAnswer: 'option1', editable: false },
    // Add more questions as needed
  ];

  constructor(
    private auth: AuthserviceService,
    private toastService: ToastService,
    private router: Router,
    private modal: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDesignations();
    this.fetchQuestionList();
  }

  OnModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    
    const dialogRef = this.modal.open(AddQuestionmodalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchQuestionList(); // Refresh the question list after adding a new question
      }
    });
  }

 

  fetchQuestionList() {
    this.auth.getAllQuestions().subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.status) {
          this.Techlist = response.data; // Assuming response.data contains the list of questions
          console.log("Fetched questions:", this.Techlist);
        } else {
          console.error('Error fetching questions:', response.message);
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching questions:', error);
        this.cdr.detectChanges();
      }
    );
  }

  fetchDesignations() {
    this.auth.getDesignations().subscribe(
      (response: any) => {
        if (response.status) {
          this.designations = response.data;
          console.log("Fetched designations:", this.designations);
        } else {
          console.error('Error fetching designations:', response.message);
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching designations:', error);
        this.cdr.detectChanges();
      }
    );
  }

  deleteQuestion(tech: any): void {
    console.log(`Deleting question with _id: ${tech._id}`);
    this.auth.deleteQuestion(tech._id).subscribe((response: any) => {
      if (response.status === true) {
        this.Techlist = this.Techlist.filter(t => t._id !== tech._id); // Remove deleted question from list
        this.toastService.showSuccess("Successfully", "Deleted Successfully");
      } else {
        console.error('Error deleting question:', response.message);
        this.toastService.showError("Error", "Failed to delete question");
      }
      this.cdr.detectChanges();
    }, (error) => {
      console.error('Error deleting question:', error);
      this.toastService.showError("Error", "An error occurred while deleting question");
      this.cdr.detectChanges();
    });
  }

  selectDesignation(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const designationId = target.value;
    console.log('Selected designation ID:', designationId);

    if (designationId === 'all') {
      this.fetchQuestionList(); // Fetch all questions if "All" is selected
    } else {
      this.auth.getAllQuestionsbyId(designationId).subscribe(
        (response: any) => {
          if (response.status === true) {
            this.Techlist = response.data;
          } else {
            this.toastService.Info("No Data Found", "No data found");
            console.error('Error fetching questions by designation:', response.message);
          }
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching questions by designation:', error);
          this.cdr.detectChanges();
        }
      );
    }
  }


  EditQuestion(id: any) {
    this.auth.getQuestionById(id).subscribe(
      (response) => {
        
  
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          question: response // Pass the fetched question data here
        };
  
        const dialogRef = this.modal.open(EditQuestionComponent, dialogConfig);
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Reload questions or handle the result as needed
            this.fetchQuestionList();
          }
        });
      },
      (error) => {
        console.error('Failed to fetch question data', error);
      }
    );
  }

  

  // saveQuestion(tech: any) {
  //   tech.editable = false;
  //   console.log("tech", tech);
  //   this.auth.UpdateQuestion(tech._id, tech).subscribe(
  //     (response: any) => {
  //       if (response.status) {
  //         console.log('Question updated successfully');
  //         this.toastService.showSuccess("Successfully", "Question updated successfully");
  //       } else {
  //         console.error('Error updating question:', response.message);
  //         this.toastService.showError("Error", "Failed to update question");
  //       }
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error updating question:', error);
  //       this.toastService.showError("Error", "An error occurred while updating question");
  //       this.cdr.detectChanges();
  //     }
  //   );
  // }
 
}
