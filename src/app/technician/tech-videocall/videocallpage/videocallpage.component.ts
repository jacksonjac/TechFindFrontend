import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
@Component({
  selector: 'app-videocallpage',
  templateUrl: './videocallpage.component.html',
  styleUrls: ['./videocallpage.component.scss']
})
export class VideocallpageComponent {

  @ViewChild('zegoContainer', { static: true }) zegoContainer!: ElementRef;

  roomId: string | undefined;
  userId = localStorage.getItem('Userid') || 'guest';
  techName = localStorage.getItem('techName') || '';
  
  constructor(private route: ActivatedRoute, private http: HttpClient,private auth:TechAuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      
      const UserName = this.techName;
    
      if (this.roomId && UserName) {
        this.initializeZegoCloud(this.roomId, UserName);
      } else {
        console.error('Room ID is undefined');
      }
    });
  }

  initializeZegoCloud(roomId: string, UserName: string) {
    const appId = 1758211850;
    const serverSecret = 'f0e7240978b927fd0012be43975a3fc0';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId, 
      serverSecret, 
      roomId, 
      Date.now().toString(),
      UserName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: this.zegoContainer.nativeElement,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
      showRoomTimer: true,
    });
  }

  sendEmail() {
    const email = localStorage.getItem('userEmailtovideocall')
    if (this.roomId && email) {
      this.auth.sendRoomIdToEmail(this.roomId, email).subscribe(response => {
        console.log('Email sent successfully');
      }, error => {
        console.error('Error sending email:', error);
      });
    }
  }

}
