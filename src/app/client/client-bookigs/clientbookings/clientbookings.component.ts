import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

@Component({
  selector: 'app-clientbookings',
  templateUrl: './clientbookings.component.html',
  styleUrls: ['./clientbookings.component.scss']
})
export class ClientbookingsComponent implements OnInit {
  BookingData: any[] = [];

  constructor(private auth: UserAuthService) {}

  ngOnInit(): void {
    const userid = localStorage.getItem("Userid");
    if (userid) {
      this.getAllBookingsById(userid);
    }
  }

  getAllBookingsById(userid: any): void {
    this.auth.getAllbookingsbyId(userid).subscribe((response: any) => {
      console.log(response);
      this.BookingData = response.data;
    }, error => {
      console.error("Error fetching bookings:", error);
    });
  }
}
