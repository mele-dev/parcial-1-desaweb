import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MainStoreService } from '../services/main-store.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const mainStore = inject(MainStoreService);
  const token = mainStore.token();
  if (token) {
    console.log("Inyectamos el token: " + token);
     const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
