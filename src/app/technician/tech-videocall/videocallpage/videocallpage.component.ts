import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: TechAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      
      if (this.roomId && this.techName) {
        this.initializeZegoCloud(this.roomId, this.techName);
      } else {
        console.error('Room ID or UserName is undefined');
        // Handle error, e.g., redirect to a different page or show a message
        this.router.navigate(['/error']);  // Redirect to an error page
      }
    });
  }

  initializeZegoCloud(roomId: string, UserName: string) {
    const appId = 592111496
    const serverSecret =  '72b580c42d885d5999b3c380e84556eb'; // This should be moved to backend
  
    // Generate kit token from backend
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId, 
      serverSecret, 
      roomId, 
      this.userId,  // Use consistent user ID
      UserName
    );
  
    const zc = ZegoUIKitPrebuilt.create(kitToken);
  
    try {
      zc.joinRoom({
        container: this.zegoContainer.nativeElement,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        showRoomTimer: true,
      });
    } catch (error) {
      console.error('Failed to join room:', error);
      // Handle SDK initialization error, e.g., show a message to the user
    }
  }

  sendEmail() {
    const email = localStorage.getItem('userEmailtovideocall');
    if (this.roomId && email) {
      this.auth.sendRoomIdToEmail(this.roomId, email).subscribe(response => {
        console.log('Email sent successfully');
      }, error => {
        console.error('Error sending email:', error);
        // Additional error handling can be done here
      });
    } else {
      console.error('Email or Room ID is missing');
    }
  }
}
