import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatPageComponent } from 'src/app/technician/chat-page/chat-page.component';
@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.scss']
})
export class CreateroomComponent {


  roomId: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<CreateroomComponent>, 
    private router: Router
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  createRoom() {
    if (this.roomId) {
      this.dialogRef.close();
      this.router.navigate(['technician/room', this.roomId]);
    }
  }

}
