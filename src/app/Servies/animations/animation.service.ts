import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('1500ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 }))
  ])
]);
