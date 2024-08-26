import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  
  selectedDesignation: any;
  showDropdown = false;
  Techlist: any[] = [];
  
  constructor(private auth: AuthserviceService,
              private toastService: ToastService,
              private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.initDropdown();
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

  getUser() {
    this.auth.Userlist().subscribe(
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

  blockTech(userId: string) {
    this.auth.blockTech(userId).subscribe(
      (response) => {
        console.log("Tech blocked successfully:", response);
        if (response.status === true) {
          this.toastService.showSuccess('Blocked Successfully', 'Block User Successfully');
          const tech = this.Techlist.find(t => t._id === userId);
          if (tech) {
            tech.blocked = true;
          }
        }
      },
      (error) => {
        console.error('Error blocking user:', error);
      }
    );
  }

  UnblockTech(userId: string) {
    this.auth.UnblockTech(userId).subscribe(
      (response) => {
        console.log("Tech unblocked successfully:", response);
        if (response.status === true) {
          this.toastService.showSuccess('Unblocked Successfully', 'Unblock User Successfully');
          const tech = this.Techlist.find(t => t._id === userId);
          if (tech) {
            tech.blocked = false;
          }
        }
      },
      (error) => {
        console.error('Error unblocking user:', error);
      }
    );
  }
}