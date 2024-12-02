import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const accessToken = cookieService.get('accessToken');
  const refreshToken = cookieService.get('refreshToken');

  if (accessToken && refreshToken) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
