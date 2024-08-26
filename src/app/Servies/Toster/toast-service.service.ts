import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private confirmationSubject = new Subject<boolean>();
  WrongAnswer(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private messageService: MessageService) {}

  showSuccess(summary: string, detail: string) {
    console.log("messages showed showsucess")
    this.messageService.add({ severity: 'success', summary: summary, detail: detail });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: detail });
  }

  CorrectAnswer(summary: string, detail: string) {
    console.log("messages showed showsucess")
    this.messageService.add({ severity: 'success', summary: summary, detail: detail });
  }

  Wronganswer(summary: string, detail: string) {
    this.messageService.add({ severity: 'Error', summary: summary, detail: detail });
  }

Info(summary: string, detail: string) {
    this.messageService.add({ severity: 'Info', summary: summary, detail: detail });
  }
  confirm(summary: string, detail: string) {
    this.confirmationSubject.next(null!); // Reset the confirmation subject
    this.messageService.add({
      key: 'c',
      severity: 'warn',
      summary,
      detail,
      sticky: true
    });
    return this.confirmationSubject.asObservable();
  }

  confirmAction(confirmed: boolean) {
    this.confirmationSubject.next(confirmed);
    this.messageService.clear('c'); // Clear the message after action
  }
}