import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';

@Component({
  selector: 'app-technicianlist',
  templateUrl: './technicianlist.component.html',
  styleUrls: ['./technicianlist.component.scss']
})
export class TechnicianlistComponent implements OnInit, AfterViewInit{
  designations: any[] = [];
  selectedDesignation: any;
  showDropdown = false;
  Techlist: any[] = [];
  searchText =""
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  p: number = 1;

  constructor(
    private auth: AuthserviceService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTechnicians();
  }

  ngAfterViewInit(): void {
    this.initDropdown();
    this.fetchDesignations();
  }

  initDropdown() {
    const dropdownToggle = document.getElementById('dropdownDefaultButton');
    const dropdownMenu = document.getElementById('dropdown');

    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
      });
    }
  }

  getTechnicians() {
    this.auth.Techlist().subscribe(
      (response) => {
        console.log("Techlist in front end", response);
        if (response.status) {
          this.Techlist = response.data;
        } else {
          console.error('Error fetching user list:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching user list:', error);
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
      },
      (error) => {
        console.error('Error fetching designations:', error);
      }
    );
  }

  selectDesignation(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const designationId = target.value;
    console.log('Selected designation ID:', designationId);

    if (designationId === 'all') {
      this.getTechnicians();
    } else {
      this.auth.getAllTechbyId(designationId).subscribe(
        (response) => {
          console.log(response, "response from selection");
          if (response.status === true) {
            this.Techlist = response.data;
          } else {
            this.toastService.Info("No Data Found", "No data found");
            console.error('Error fetching technicians by designation:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching technicians by designation:', error);
        }
      );
    }
  }

  approveTech(id: any) {
    this.auth.ApproveTech(id).subscribe(
      (response) => {
        console.log("Tech approved successfully:", response);
        if (response.status === true) {
          this.toastService.showSuccess('Approved Successfully', 'Approve Technician Successfully');
          this.updateTechStatus(id, 'Approved', true);
        }
      },
      (error) => {
        console.error('Error approving technician:', error);
      }
    );
  }

  denyTech(id: any) {
    this.auth.DeniedTech(id).subscribe(
      (response) => {
        console.log("Tech denied successfully:", response);
        if (response.status === true) {
          this.toastService.showSuccess('Denied Successfully', 'Deny Technician Successfully');
          this.updateTechStatus(id, 'Approved', false);
        }
      },
      (error) => {
        console.error('Error denying technician:', error);
      }
    );
  }

  blockTech(userId: string) {
    this.auth.blockTech(userId).subscribe(
      (response) => {
        console.log("Tech blocked successfully:", response);
        if (response.status === true) {
          this.toastService.showSuccess('Blocked Successfully', 'Block Technician Successfully');
          this.updateTechStatus(userId, 'blocked', true);
        }
      },
      (error) => {
        console.error('Error blocking technician:', error);
      }
    );
  }

  UnblockTech(userId: string) {
    this.auth.UnblockTech(userId).subscribe(
      (response) => {
        console.log("Tech unblocked successfully:", response);
        if (response.status === true) {
          this.toastService.showSuccess('Unblocked Successfully', 'Unblock Technician Successfully');
          this.updateTechStatus(userId, 'blocked', false);
        }
      },
      (error) => {
        console.error('Error unblocking technician:', error);
      }
    );
  }

  updateTechStatus(userId: string, statusKey: string, statusValue: boolean) {
    const tech = this.Techlist.find(t => t._id === userId);
    if (tech) {
      tech[statusKey] = statusValue;
    }
  }

}
