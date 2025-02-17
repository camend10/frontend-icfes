import { Component } from '@angular/core';
import { Curso } from '../../../models/curso.model';
import { Grado } from '../../../models/grado.model';
import { Materia } from '../../../models/materia.model';
import { Usuario } from '../../../models/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { GeneralService, UsuarioService } from '../../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  cargando: boolean = true;

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  cursos: Curso[] = [];
  grados: Grado[] = [];
  materias: Materia[] = [];

  grado_id: number = 0;
  curso_id: number = 0;
  user_id: number = 0;
  materia_id: number = 0;
  materia!: Materia;

  user!: Usuario;

  grado: string = '';
  curso: string = '';

  numpre: number = 0;
  tipo: string = '';

  fecha_inicio: string = '';
  fecha_final: string = '';


  constructor(private toastr: ToastrService,
    public _generalService: GeneralService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
    this.cargando = false;
    this.user = this._usuarioService.usuario;
    // this.grado_id = this.user.grado_id;

  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarGrados();
    this.cargarMaterias();
    this.closeSidebar();
  }

  ngOnDestroy(): void {
    // Quitar el atributo cuando el componente se destruye
    document.body.removeAttribute('data-kt-app-sidebar-minimize');
  }

  closeSidebar() {
    const bodyTag = document.body;
    bodyTag.setAttribute('data-kt-app-sidebar-minimize', 'on');
  }

  onFechaInicioChange(): void {
    // Si la fecha final es menor que la fecha inicial, actualiza la fecha final
    if (this.fecha_final < this.fecha_inicio) {
      this.fecha_final = this.fecha_inicio;
    }
    this.filtrarUsuarios();
  }

  onFechaFinalChange(): void {
    // Si la fecha inicial es mayor que la fecha final, actualiza la fecha inicial
    if (this.fecha_inicio > this.fecha_final) {
      this.fecha_inicio = this.fecha_final;
    }
    this.filtrarUsuarios();
  }

  cargarCursos() {
    this._generalService.cargarCursos()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
      })
  }

  cargarMaterias() {
    this._generalService.cargarMaterias()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((materias: Materia[]) => {
        this.materias = materias;
      })
  }

  cargarGrados() {
    this._generalService.cargarGrados()
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((grados: Grado[]) => {
        this.grados = grados;
      })
  }

  buscar() {
    this.usuarios = [];
    if (this.grado_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione un grado',
        icon: "error"
      });
      return;
    }
    if (this.materia_id === 0) {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione un área del saber',
        icon: "error"
      });
      return;
    }
    if (this.tipo === '') {
      Swal.fire({
        title: "Error!",
        text: 'Por favor seleccione un tipo',
        icon: "error"
      });
      return;
    }

    this.usuarios = [];
    this.cargando = true;
    this._generalService.cargarEntrenamientos(this.materia_id, this.grado_id, this.curso_id, this.numpre, this.tipo)
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: error.error.error,
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        this.materia = resp.materia;
        this.cargando = false;
        this.filtrarUsuarios();
      })
  }

  cambiarGrado(evento: any) {
    const itemId = evento.target.value;
    const item = this.grados.find(item => item.id == itemId);
    this.grado = (item ? item.sigla : '') + '';
    this.usuarios = [];
    this.usuariosFiltrados = [];
    this.materia_id = 0;
    
  }

  cambiarCurso(evento: any) {
    const itemId = evento.target.value;
    const item = this.cursos.find(item => item.id == itemId);
    this.curso = (item ? item.sigla : '') + '';
    this.filtrarUsuarios();
  }

  cambiarArea(evento: any) {
    this.usuarios = [];
    this.usuariosFiltrados = [];
  }

  cambiarTipo() {
    this.usuarios = [];
    this.usuariosFiltrados = [];
  }

  cambiar() {
    this.filtrarUsuarios();
  }

  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(user => {
      const userFecha = new Date(user.fecha); // Convertimos la fecha del usuario a un objeto Date
      const fechaInicio = this.fecha_inicio ? new Date(this.fecha_inicio) : null;
      const fechaFinal = this.fecha_final ? new Date(this.fecha_final) : null;

      return (
        (!Number(this.curso_id) || Number(user.curso_id) === Number(this.curso_id)) &&
        (!Number(this.numpre) || (Number(this.numpre) === 31 ? Number(user.num_preguntas) > 30 : Number(user.num_preguntas) === Number(this.numpre))) &&
        (!fechaInicio || userFecha >= fechaInicio) &&  // Verifica que la fecha del usuario sea >= fechaInicio
        (!fechaFinal || userFecha <= fechaFinal)       // Verifica que la fecha del usuario sea <= fechaFinal
      );
    });
  }

  reset() {
    this.curso_id = 0;
    this.numpre = 0;

    this.fecha_inicio = '';
    this.fecha_final = '';
    this.filtrarUsuarios();
  }

  get materiasFiltradas() {
    return this.materias.filter(materia => {
      const gradoId = this.user.grado_id;

      // Definir solo las propiedades de grado relevantes
      const gradosPermitidos = [materia.g11, materia.g10, materia.g9, materia.g7, materia.g5, materia.g3];

      return gradosPermitidos.includes(Number(this.grado_id));
    });
  }

}
