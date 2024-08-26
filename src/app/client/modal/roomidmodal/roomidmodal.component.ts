import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roomidmodal',
  templateUrl: './roomidmodal.component.html',
  styleUrls: ['./roomidmodal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300)
      ]),
    ])
  ]
})
export class RoomidmodalComponent {

  roomId: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<RoomidmodalComponent>, 
    private router: Router
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  createRoom() {
    if (this.roomId) {
      this.dialogRef.close();
      this.router.navigate(['/room', this.roomId]);
    }
  }

}
