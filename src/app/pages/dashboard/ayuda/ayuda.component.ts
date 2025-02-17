import { Component } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../services/service.index';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styles: ``
})
export class AyudaComponent {

  videoIntro: string | undefined;
  videoUsuarios: string | undefined;
  videoInsti: string | undefined;
  videoPreg: string | undefined;
  videoInfor: string | undefined;
  videoPruebas: string | undefined;
  videoEntrenador: string | undefined;

  constructor(
    public _generalService: GeneralService
  ) {

  }

  ngOnInit(): void {
    this.loadVideo('01_Introduccion_Administrador.mp4', 1);
    this.loadVideo('02_Usuarios_ Administrador.mp4', 2);
    this.loadVideo('03_Instituciones_Administrador.mp4', 3);
    this.loadVideo('04_Preguntas_Administrador.mp4', 4);
    this.loadVideo('05_Informes_Administrador.mp4', 5);
    this.loadVideo('06_Pruebas_Administrador.mp4', 6);
    this.loadVideo('07_Entrenador_Administrador.mp4', 7);
  }

  descargar() {
    this._generalService.descargar("MANUAL_DE_USUARIO_GOSABER_ADMIN.pdf")
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error"
          });
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {

      });
  }

  loadVideo(filename: string, opc: number): void {
    if (opc === 1) {
      this.videoIntro = this._generalService.getVideoUrl(filename);
    }
    if (opc === 2) {
      this.videoUsuarios = this._generalService.getVideoUrl(filename);
    }
    if (opc === 3) {
      this.videoInsti = this._generalService.getVideoUrl(filename);
    }
    if (opc === 4) {
      this.videoPreg = this._generalService.getVideoUrl(filename);
    }
    if (opc === 5) {
      this.videoInfor = this._generalService.getVideoUrl(filename);
    }
    if (opc === 6) {
      this.videoPruebas = this._generalService.getVideoUrl(filename);
    }
    if (opc === 7) {
      this.videoEntrenador = this._generalService.getVideoUrl(filename);
    }
  }
}
