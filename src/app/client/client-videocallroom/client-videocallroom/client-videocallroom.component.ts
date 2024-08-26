import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'; // Import the ZegoUIKitPrebuilt

@Component({
  selector: 'app-client-videocallroom',
  templateUrl: './client-videocallroom.component.html',
  styleUrls: ['./client-videocallroom.component.scss']
})
export class ClientVideocallroomComponent implements OnInit{


  @ViewChild('zegoContainer', { static: true }) zegoContainer!: ElementRef;

  roomId: string | undefined;
  userId = localStorage.getItem('Userid') || 'guest';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      console.log(this.roomId)
      const Username = localStorage.getItem('UserName') || 'guest'
      if (this.roomId) {
        this.initializeZegoCloud(this.roomId, Username);
      } else {
        console.error('Room ID is undefined');
      }
    });
  }

  initializeZegoCloud(roomId: string, Username: string) {
    const appId = 1758211850;
    const serverSecret = 'f0e7240978b927fd0012be43975a3fc0';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId, 
      serverSecret, 
      roomId, 
      Date.now().toString(),
      Username
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
}
