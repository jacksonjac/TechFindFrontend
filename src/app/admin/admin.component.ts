import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../Servies/admin/authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  
  
  constructor(private authService:AuthserviceService){}
  ngOnInit(): void {
   
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
