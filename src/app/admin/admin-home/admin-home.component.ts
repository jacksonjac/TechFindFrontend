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

  dataCombo: any;
  dataPie: any;
  chartOptionsCombo: any;
  chartOptionsPie: any;
  subscription: Subscription | undefined;
  config: AppConfig | undefined;
  TotalUsers: number = 0;
  TotalTech: number = 0;
  TotalBookings: number = 0;
  MonthlyRevenue: number = 0;
  technicianTypeCounts: any[] = [];
  bookingsLast7Days: any[] = [];

  constructor(private auth: AuthserviceService) {}

  ngOnInit(): void {
    this.initializeCharts(); // Initialize default chart data
    this.getDashboardData(); // Fetch data for the dashboard
  }

  // Initialize the default chart data
  initializeCharts() {
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
        }
      ]
    };

    this.dataPie = {
      labels: ['Computer Technicians', 'Mobile Technicians', 'AC Technicians'],
      datasets: [
        {
          data: [300, 50, 100], // Placeholder data
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    };
  }

  // Fetch data for the dashboard
  getDashboardData() {
    this.auth.getDashboardData().subscribe((response: any) => {
      console.log(response,"getdashboard info")
      if (response && response.status) {
        const dashboardData = response.data.data;

        // Set the data from the response
        this.TotalUsers = dashboardData.totalUsers;
        this.TotalTech = dashboardData.totalTechnicians;
        this.TotalBookings = dashboardData.totalBookings;
        this.MonthlyRevenue = dashboardData.totalRevenue;
        this.technicianTypeCounts = dashboardData.technicianTypeCounts;
        this.bookingsLast7Days = dashboardData.bookingsLast7Days;

        // Update pie chart data dynamically
        this.updatePieChartData();
        // Update combo chart data dynamically
        this.updateComboChartData();
      } else {
        console.error("Failed to fetch dashboard data:", response.message);
      }
    });
  }

  // Update the pie chart with fetched technician types count
  updatePieChartData() {
    const labels = this.technicianTypeCounts.map(type => type.designationName); // Assuming _id contains type like Computer, Mobile, etc.
    const data = this.technicianTypeCounts.map(type => type.count);

    this.dataPie = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    };
  }

  // Update the combo chart with fetched bookings data
  updateComboChartData() {
    const labels = this.bookingsLast7Days.map(day => day.date); // Assuming date contains the formatted date as 'YYYY-MM-DD'
    const data = this.bookingsLast7Days.map(day => day.count + 10); // Add an offset of 10 to each booking count
  
    this.dataCombo = {
      labels,
      datasets: [
        {
          type: 'line',
          label: 'Bookings Over Last 7 Days',
          borderColor: '#42A5F5',
          borderWidth: 1,
          fill: false,
          data
        }
      ]
    };
  }
  

}
