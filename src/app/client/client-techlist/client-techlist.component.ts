import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { UserAuthService, } from 'src/app/Servies/Users/user-auth.service';


@Component({
  selector: 'app-client-techlist',
  templateUrl: './client-techlist.component.html',
  styleUrls: ['./client-techlist.component.scss']
})
export class ClientTechlistComponent implements OnInit{
  
  isLoading:boolean = false
  selectedTechnician: string | null = null; 
  technicians: any[] = []; 
  TechList: any[] = [];
  UserName: string = 'UserName';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  p: number = 1;
  searchText: string = '';
  searchLocation: string = '';
  
  constructor(private auth: UserAuthService,
    private router:Router,
    private toaster:ToastService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
     this.spinner.show()
     this.isLoading = true
    let Email = localStorage.getItem('email');
    if (Email) {
      this.UserName = Email;
    }
    this.getTechnicians();
    this.getDesignations()
  }

  getTechnicians(): void {
    this.spinner.show()
    this.isLoading = true
    this.auth.Techlist().subscribe(
      (response: any) => {
        console.log(response); 
        this.spinner.hide()
        this.isLoading = false// Log the response
        if (response && response.status) { // Assuming status indicates success
          if (Array.isArray(response.data)) {
            this.TechList = response.data;
            this.cdr.detectChanges(); 
            if (this.TechList.length === 0) {
              this.toaster.Info('No technicians found',"");
            }
            this.cdr.detectChanges();
          } else {
            console.error('Response data is not an array');
            this.toaster.Info('Invalid response format', "");
          }
        } else {
          console.error('Response status indicates failure');
          this.toaster.Info('Failed to fetch technicians','');
        }
      },
      (error) => {
        console.error('Error fetching technicians:', error);
        this.toaster.Info('Error fetching technicians', '');
      }
    );
  }


  getDesignations(): void {
    this.spinner.show()
    this.isLoading = true
    this.auth.getDesignations().subscribe(
      (response) => {
        this.spinner.hide()
        this.isLoading = false// Log the response
        console.log("getDesignation", response);
        this.technicians= response.data;
        this.cdr.detectChanges(); // Assuming response.data is where the array of technicians is stored
      },
      (error) => {
        console.error('Error fetching designations:', error);
      }
    );
  }

  onTechnicianChange(selectedTechnicianId: string): void {
    this.spinner.show()
    this.isLoading = true
    console.log('Selected technician ID:', selectedTechnicianId);
    this.auth.getAllTechbyId(selectedTechnicianId).subscribe(
      (response: any) => {
        console.log('Technicians by ID:', response);
        if (response.data) {
          this.spinner.hide()
          this.isLoading = false// Log the response
          this.TechList = response.data; // Assuming response.data contains the list of technicians for the selected designation ID
          if (this.TechList.length === 0) {
            this.toaster.Info('No technicians found for the selected designation', '');
          }
          this.cdr.detectChanges();
        } else {
          console.error('Response data is empty');
          this.toaster.Info('No technicians found for the selected designation','');
        }
      },
      (error) => {
        console.error('Error fetching technicians by ID:', error);
        this.toaster.Info('Error fetching technicians by designation','');
      }
    );
  }

  showTechDetails(id:string){
  
    console.log("idoftech",id)
     this.router.navigate(["/TechDetatils",id])
     this.cdr.detectChanges();
  }

}




