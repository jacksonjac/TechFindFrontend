import { Component, OnInit } from '@angular/core';
import {  ChartServiceService , AppConfig } from '../../Servies/Technician/chart-service.service'
import { Subscription } from 'rxjs';
import { AuthserviceService } from 'src/app/Servies/admin/authservice.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{


  constructor(private auth:AuthserviceService){

  }
  ngOnInit(): void {
    this.dataCombo = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: '#42A5F5',
          borderWidth: 1,
          fill: false,
          data: [50, 25, 12, 48, 56, 76, 42]
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: '#66BB6A',
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: '#FFA726',
          data: [41, 52, 24, 74, 23, 21, 32]
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: '#FFA729',
          data: [41, 52, 24, 74, 23, 21, 32]
        }
      ]
    };

    this.dataPie = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    };

    this.getDashboardData()
  }

  dataCombo: any;
  dataPie: any;
  chartOptionsCombo: any;
  chartOptionsPie: any;
  subscription: Subscription | undefined;
  config: AppConfig | undefined;
  TotalUsers:number=0
  TotalTech:number=0
 
  getDashboardData(){

  this.auth.getDashboardData().subscribe((responce:any)=>{

    if(responce){

      this.TotalUsers = responce.data.data.totalUsers
      this.TotalTech = responce.data.data.totalTechnicians
    }
    console.log(responce,"this is te totals")
  })

  }

}
