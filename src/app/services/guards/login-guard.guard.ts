import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../service.index';

export const LoginGuardGuard: CanActivateFn = (route, state) => {
  const _usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (_usuarioService.estaLogueado()) {
    console.log('PASO EL GUARD');
    return true;
  }else{
    console.log('BLOQUEADO POR EL GUARD');
    router.navigate(["/login"]);
    return false;
  }

  // let token = auth.token;
  // let expirado = (JSON.parse(atob(token!.split('.')[1]))).exp;
  // if ((Math.floor((new Date).getTime() / 1000)) >= expirado) {
  //   auth.logout();
  //   return false;
  // } else {
  //   return true;
  // }

  // return true;
};
