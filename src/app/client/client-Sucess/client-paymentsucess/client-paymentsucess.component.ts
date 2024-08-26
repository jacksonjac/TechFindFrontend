import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

@Component({
  selector: 'app-client-paymentsucess',
  templateUrl: './client-paymentsucess.component.html',
  styleUrls: ['./client-paymentsucess.component.scss']
})
export class ClientPaymentsucessComponent {

  slotId: string | null = null;
  AppoimentData: any;

  constructor(private route: ActivatedRoute, private auth: UserAuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.slotId = params['slotId'];
      console.log('Slot ID:', this.slotId);
      this.getAppoinmentData(this.slotId);
    });
  }

  getAppoinmentData(slotId: any) {
    this.auth.getAppoimentDataById(slotId).subscribe((response:any) => {
      console.log(response, "this is the all Data of an appointment for the success page");
      if (response) {
        this.AppoimentData = response.data
        console.log(this.AppoimentData,"this is ithe data of a appoinment")
      }
    });
  }

}
