import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

export const notokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  const token = localStorage.getItem('techtoken');
  
  if(token){
    router.navigate(["/technician"])
  }

  return true;
};
