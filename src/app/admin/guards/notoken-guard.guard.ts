import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

export const notokenGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const router = inject(Router);
  const toastService = inject(ToastService);
  const token = localStorage.getItem('admintoken');

  if(token){
    router.navigate(["admin/adminhome"])
  }
  return true;
};
