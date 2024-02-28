import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins(): any;

const BODY_CLASSES = ['app-blank', 'bgi-size-cover', 'bgi-attachment-fixed', 'bgi-position-center', 'bgi-no-repeat'];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public router: Router) {

  }

  ngOnInit(): void {
    init_plugins();
    console.log("init funcion");
    const bodyTag = document.body;
    bodyTag.classList.add('app-default');
    bodyTag.classList.remove('kt_app_body');
    BODY_CLASSES.forEach((c) => document.body.classList.add(c));
    bodyTag.style.backgroundImage = "url('../../assets/media/auth/bg10.jpeg')";
  }

  ngOnDestroy() {
    BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
    const bodyTag = document.body;
    bodyTag.classList.remove('app-default');
    bodyTag.classList.add('kt_app_body');
    bodyTag.style.backgroundImage = "";
  }

  navegar() {
    this.router.navigate(['/dashboard']);
  }
}