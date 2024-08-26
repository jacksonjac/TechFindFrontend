
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';
import { AddDesignationComponent } from '../modals/add-designation/add-designation.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-manage-desi',
  templateUrl: './admin-manage-desi.component.html',
  styleUrls: ['./admin-manage-desi.component.scss']
})
export class AdminManageDesiComponent {
  searchText=''
  designations: any[] = [];
  selectedDesignation: any;
  showDropdown = false;
  editMode: boolean = false; // Flag to toggle edit mode for designations
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  p: number = 1;
  constructor(
    private auth: AuthserviceService,
    private toastService: ToastService,
    private router: Router,
    private modal: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDesignations();
  }

  fetchDesignations() {
    this.auth.getDesignations().subscribe(
      (response: any) => {
        if (response.status) {
          this.designations = response.data;
          console.log("Fetched designations:", this.designations);
          // Initialize edit mode for each designation to false
          this.designations.forEach(designation => designation.editable = false);
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

  OnModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.modal.open(AddDesignationComponent, dialogConfig);

    dialogRef.componentInstance.designationAdded.subscribe(() => {
      this.fetchDesignations();  // Refresh the designation list
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchDesignations();
      }
    });
  }

  toggleEdit(designation: any) {
    // Toggle edit mode for the clicked designation
    designation.editable = !designation.editable;
    this.cdr.detectChanges();
  }

  saveDesignation(designation: any) {
    console.log("form saveDesignation", designation, designation._id)
    this.auth.updateDesignation(designation._id, designation).subscribe(
      (response: any) => {
        if (response.status) {
          console.log('Designation updated successfully');
          this.toastService.showSuccess('Success', 'Designation updated successfully');
          this.fetchDesignations();
        } else {
          console.error('Error updating designation:', response.message);
          this.toastService.showError('Error', 'Failed to update designation');
        }
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error updating designation:', error);
        this.toastService.showError('Error', 'An error occurred while updating designation');
        this.cdr.detectChanges();
      }
    );
    designation.editable = false;
  }

  deleteDesignation(designationId: string) {
    this.auth.deleteDesignation(designationId).subscribe(
      (response: any) => {
        if (response.status) {
          console.log('Designation deleted successfully');
          this.toastService.showSuccess('Success', 'Designation deleted successfully');
          this.designations = this.designations.filter(designation => designation._id !== designationId);
        } else {
          console.error('Error deleting designation:', response.message);
          this.toastService.showError('Error', 'Failed to delete designation');
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error deleting designation:', error);
        this.toastService.showError('Error', 'An error occurred while deleting designation');
        this.cdr.detectChanges();
      }
    );
  }
}
