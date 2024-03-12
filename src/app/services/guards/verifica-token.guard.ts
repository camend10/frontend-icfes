import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../service.index';
import { inject } from '@angular/core';

export const verificaTokenGuard: CanActivateFn = (route, state) => {
  console.log("inicio de verifica token guards");

  const _usuarioService = inject(UsuarioService);
  const router = inject(Router);

  let token = _usuarioService.token;

  let payload = JSON.parse(atob(token.split('.')[1]));

  let expirado = _usuarioService.expirado(payload.exp);

  if (expirado) {
    router.navigate(['/login']);
    return false;
  }

  // return true;
  return _usuarioService.verificaRenueva(payload.exp);

};


