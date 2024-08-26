import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';



@Component({
  selector: 'app-tech-quizhome',
  templateUrl: './tech-quizhome.component.html',
  styleUrls: ['./tech-quizhome.component.scss']
})
export class TechQuizhomeComponent {
  designations: any[] = [];
  selectedDesignation: string = ''; // Initialize as an empty string

  constructor(private router: Router, private auth: TechAuthService) {}

  ngOnInit() {
    this.fetchDesignations();
  }

  onDesignationChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedDesignation = target.value;
  }

  fetchDesignations() {
    this.auth.getDesignations().subscribe(
      (response: any) => {
        if (response.status) {
          this.designations = response.data;
          console.log("Fetched designations:", this.designations);
          // Set the selectedDesignation to the ID of the first designation
          if (this.designations.length > 0) {
            this.selectedDesignation = this.designations[0]._id;
          }
        } else {
          console.error('Error fetching designations:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching designations:', error);
      }
    );
  }

  startQuiz() {
    if (this.selectedDesignation) {
      this.router.navigate(['/technician/quiz-page'], { queryParams: { designation: this.selectedDesignation } });
    }
  }

}
