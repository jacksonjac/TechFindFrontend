import { Component } from '@angular/core';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';

@Component({
  selector: 'app-meeting-lists',
  templateUrl: './meeting-lists.component.html',
  styleUrls: ['./meeting-lists.component.scss']
})
export class MeetingListsComponent  {

  meetings: any[] = [];

  constructor(private authService: TechAuthService) { }

  ngOnInit(): void {
    this.fetchMeetings();
  }

  fetchMeetings(): void {
    this.authService.getMeetings().subscribe((data: any) => {
      console.log("fetch all meetings response",data)
      this.meetings = data.data
    }, error => {
      console.error('Error fetching meetings:', error);
    });
  }

}
