import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service'; // Adjust the import path accordingly

export const authguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  const token = localStorage.getItem('admintoken');
  if (token) {
    return true;
  } else {
    toastService.showError('Unauthorized Access', 'You need to be logged in to access this page.');
    router.navigate(['admin']);
    return false;
  }
};
