import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

export const authguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  const token = localStorage.getItem('techtoken');
  if (token) {
    
    return true;
  } else {
   
    router.navigate(["/technician/login"]);
    return false;
  }
};
