import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from './client.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const clientService = inject(ClientService);
  const router = inject(Router);


  if (clientService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
