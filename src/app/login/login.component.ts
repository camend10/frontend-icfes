import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(): any;

const BODY_CLASSES = ['app-blank', 'bgi-size-cover', 'bgi-attachment-fixed', 'bgi-position-center', 'bgi-no-repeat'];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit, OnDestroy {

  recuerdame: boolean = false;
  email: string = '';

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    init_plugins();
    const bodyTag = document.body;
    bodyTag.classList.add('app-default');
    bodyTag.classList.remove('kt_app_body');
    BODY_CLASSES.forEach((c) => document.body.classList.add(c));
    bodyTag.style.backgroundImage = "url('../../assets/media/auth/bg10.jpeg')";

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ngOnDestroy() {
    BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
    const bodyTag = document.body;
    bodyTag.classList.remove('app-default');
    bodyTag.classList.add('kt_app_body');
    bodyTag.style.backgroundImage = "";
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(
      0,
      0,
      '',
      'null',
      forma.value.email,
      '',
      forma.value.password,
      0,
      0,
      0,
      0,
      0,
      'tipo_admin'
    );
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));

  }
}