import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const mainStore = inject(MainStoreService);
  const router = inject(Router);
  // router.navigate(["auth","login"]);
  const usuario = mainStore.usuario();

  if (!usuario){
    router.navigate(["login"]);
    return false;
  }
  return true;
};
