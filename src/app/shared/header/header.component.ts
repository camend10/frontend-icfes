import { Component } from '@angular/core';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  constructor(public _usuarioService: UsuarioService) {

  }

}
