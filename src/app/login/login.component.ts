import { Component, OnDestroy, OnInit } from '@angular/core';
const BODY_CLASSES = ['app-blank', 'bgi-size-cover', 'bgi-attachment-fixed', 'bgi-position-center', 'bgi-no-repeat'];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
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
}