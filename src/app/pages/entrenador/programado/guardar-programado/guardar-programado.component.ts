import { Component } from '@angular/core';
import { Pregunta } from '../../../../models/pregunta.model';
import { Materia } from '../../../../models/materia.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { GeneralService, MateriaService } from '../../../../services/service.index';
import { Componente } from '../../../../models/componente.model';
import { Competencia } from '../../../../models/competencia.model';
import { Grado } from '../../../../models/grado.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerPreguntaModalComponent } from '../ver-pregunta-modal/ver-pregunta-modal.component';
import { ProgramadoService } from '../../../../services/programados/programado.service';


@Component({
  selector: 'app-guardar-programado',
  templateUrl: './guardar-programado.component.html',
  styleUrl: './guardar-programado.component.css'
})
export class GuardarProgramadoComponent {

  preguntas: Pregunta[] = [];
  preguntasFiltradas: Pregunta[] = [];
  totalRegistros: number = 0;
  p: number = 1;

  cargando: boolean = true;
  materia_id: number = 0;
  materia: Materia | null = null;
  programado_id: number = 0;

  componentes: Componente[] = [];
  competencias: Competencia[] = [];
  componente_id: number = 9999999;
  competencia_id: number = 9999999;
  grados: Grado[] = [];
  grado_id: number = 9999999;
  terminoBusqueda: string = '';
  nombre: string = ''; // Variable para almacenar el nombre del programa

  seleccionadas: Pregunta[] = []; // Lista de preguntas seleccionadas
  seleccionarTodo: boolean = false; // Estado del checkbox "Seleccionar Todo"

  constructor(
    public activateRoute: ActivatedRoute,
    public _materiaService: MateriaService,
    private toastr: ToastrService,
    private _generalService: GeneralService,
    private modalService: NgbModal,
    public _programadoService: ProgramadoService,
    public router: Router,
  ) {
    activateRoute.params.subscribe(params => {
      this.cargando = false;
      let id = params['id'];
      this.materia_id = params['materia_id'];
      this.cargarPreguntas(this.materia_id);

      if (id !== 'nuevo') {
        this.programado_id = id;
        this.cargarProgramado(this.programado_id);
      } else {
        this.programado_id = 0;
      }
    })
  }

  ngOnInit(): void {
    this.closeSidebar();
    forkJoin({
      componentes: this._generalService.cargarComponentes(this.materia_id),
      competencias: this._generalService.cargarCompetencias(this.materia_id),
      grados: this._generalService.cargarGrados()
    })
      .pipe(
        catchError(error => {
          Swal.fire({
            title: "Error!",
            text: "Error al cargar datos iniciales.",
            icon: "error"
          });
          this.cargando = false;
          return EMPTY;
        })
      )
      .subscribe(({ componentes, competencias, grados }: { componentes: Componente[]; competencias: Competencia[]; grados: Grado[] }) => {
        this.componentes = componentes;
        this.competencias = competencias;
        this.grados = grados;
        this.cargando = false;
      });
  }

  ngOnDestroy(): void {
    // Quitar el atributo cuando el componente se destruye
    document.body.removeAttribute('data-kt-app-sidebar-minimize');
  }

  closeSidebar() {
    const bodyTag = document.body;
    bodyTag.setAttribute('data-kt-app-sidebar-minimize', 'on');
  }

  cargarPreguntas(id: number) {
    this.cargando = true;

    this._materiaService.cargarPreguntas(id)
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
        this.totalRegistros = resp.total;
        // this.preguntas = resp.preguntas;
        this.preguntas = resp.preguntas.map((pregunta: Pregunta) => ({ ...pregunta, seleccionada: false })); // Agrega la propiedad seleccionada
        this.preguntasFiltradas = [...this.preguntas]; // Inicializa preguntasFiltradas
        this.materia = resp.materia;
        this.cargando = false;
      })
  }

  // Método para buscar preguntas
  buscarPregunta(termino: string) {
    this.terminoBusqueda = termino; // Almacena el término de búsqueda
    this.filtrarPreguntas(); // Aplica los filtros
  }

  // ✅ Método para verificar si una pregunta está seleccionada
  estaSeleccionada(pregunta: Pregunta): boolean {
    return pregunta.seleccionada || false;
  }

  // ✅ Método para seleccionar/deseleccionar una pregunta
  toggleSeleccion(pregunta: Pregunta) {
    // Verifica si no se ha seleccionado un grado válido
    if (this.grado_id === 9999999) {
      this.toastr.warning('Seleccione un grado antes de seleccionar preguntas.', 'Advertencia');
      return;
    }

    // Cambia el estado de selección de la pregunta
    pregunta.seleccionada = !pregunta.seleccionada;

    // Actualiza la lista de preguntas seleccionadas
    if (pregunta.seleccionada) {
      this.seleccionadas.push(pregunta);
    } else {
      this.seleccionadas = this.seleccionadas.filter(p => p.id !== pregunta.id);
    }

    // Sincroniza el estado de selección con this.preguntas
    const preguntaEnPreguntas = this.preguntas.find(p => p.id === pregunta.id);
    if (preguntaEnPreguntas) {
      preguntaEnPreguntas.seleccionada = pregunta.seleccionada;
    }

    // Actualiza el estado de "Seleccionar Todo"
    this.seleccionarTodo = this.preguntasFiltradas.every(p => p.seleccionada);
  }

  // ✅ Método para seleccionar/deseleccionar todas las preguntas
  toggleSeleccionarTodo() {
    // Determina si todas las preguntas filtradas están seleccionadas
    const seleccionarTodas = !this.preguntasFiltradas.every(p => p.seleccionada);

    // Actualiza el estado de cada pregunta filtrada
    this.preguntasFiltradas.forEach(pregunta => (pregunta.seleccionada = seleccionarTodas));

    // Actualiza la lista de preguntas seleccionadas
    if (seleccionarTodas) {
      // Agrega solo las preguntas filtradas que no estén ya en seleccionadas
      this.seleccionadas = [
        ...this.seleccionadas,
        ...this.preguntasFiltradas.filter(p => !this.seleccionadas.includes(p))
      ];
    } else {
      // Elimina solo las preguntas filtradas de seleccionadas
      this.seleccionadas = this.seleccionadas.filter(p => !this.preguntasFiltradas.includes(p));
    }

    // Sincroniza el estado de selección con this.preguntas
    this.preguntas.forEach(p => {
      const preguntaFiltrada = this.preguntasFiltradas.find(pf => pf.id === p.id);
      if (preguntaFiltrada) {
        p.seleccionada = preguntaFiltrada.seleccionada;
      }
    });

    // Actualiza el estado de "Seleccionar Todo"
    this.seleccionarTodo = seleccionarTodas;
  }

  onPageChange(page: number) {
    this.p = page;
  }

  filtrarPreguntas() {
    this.p = 1;
    // Aplica los filtros
    this.preguntasFiltradas = this.preguntas.filter(pregunta => {
      // Filtro por materia_id (si está definido)
      // console.log(pregunta);
      const cumpleMateria = this.materia_id ? Number(pregunta.test_id) === Number(this.materia_id) : true;

      // Filtro por componente_id (si está definido)
      const cumpleComponente = this.componente_id !== 9999999 ? Number(pregunta.componente) === Number(this.componente_id) : true;

      // Filtro por competencia_id (si está definido)
      const cumpleCompetencia = this.competencia_id !== 9999999 ? Number(pregunta.competencia) === Number(this.competencia_id) : true;

      let cumpleGrado = true;

      if (Number(this.grado_id) !== 9999999) {
        switch (Number(this.grado_id)) {
          case 1:
            cumpleGrado = Number(pregunta.g11) === 1;
            break;
          case 2:
            cumpleGrado = Number(pregunta.g11) === 1;
            break;
          case 3:
            cumpleGrado = Number(pregunta.g9) === 1;
            break;
          case 4:
            cumpleGrado = Number(pregunta.g7) === 1;
            break;
          case 5:
            cumpleGrado = Number(pregunta.g5) === 1;
            break;
          case 6:
            cumpleGrado = Number(pregunta.g3) === 1;
            break;
          default:
            cumpleGrado = false; // O false, dependiendo de lo que quieras hacer por defecto
        }
      } else {
        cumpleGrado = false; // O false, dependiendo de lo que quieras hacer por defecto
      }

      // Filtro por término de búsqueda (que_desc)
      const cumpleBusqueda = this.terminoBusqueda
        ? pregunta.que_desc.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        : true;

      // Retorna true si la pregunta cumple con todos los filtros
      return cumpleMateria && cumpleComponente && cumpleCompetencia && cumpleGrado && cumpleBusqueda;

    });

    // Actualiza el total de registros filtrados
    this.totalRegistros = this.preguntasFiltradas.length;
  }

  eliminar(item: Pregunta) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta pregunta de la lista de seleccionadas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina la pregunta de la lista de seleccionadas
        this.seleccionadas = this.seleccionadas.filter(p => p.id !== item.id);

        // Actualiza el estado de selección en this.preguntas
        const preguntaEnPreguntas = this.preguntas.find(p => p.id === item.id);
        if (preguntaEnPreguntas) {
          preguntaEnPreguntas.seleccionada = false;
        }

        // Actualiza el estado de selección en this.preguntasFiltradas
        const preguntaEnFiltradas = this.preguntasFiltradas.find(p => p.id === item.id);
        if (preguntaEnFiltradas) {
          preguntaEnFiltradas.seleccionada = false;
        }

        // Actualiza el estado de "Seleccionar Todo"
        this.seleccionarTodo = this.preguntasFiltradas.every(p => p.seleccionada);

        // Muestra un mensaje de éxito
        this.toastr.success('Pregunta eliminada de la lista de seleccionadas.', 'Éxito');
      }
    });
  }

  eliminarTodas() {

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar todas las preguntas de la lista de seleccionadas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.seleccionadas.forEach(item => {
          const preguntaEnPreguntas = this.preguntas.find(p => p.id === item.id);
          if (preguntaEnPreguntas) {
            preguntaEnPreguntas.seleccionada = false;
          }

          const preguntaEnFiltradas = this.preguntasFiltradas.find(p => p.id === item.id);
          if (preguntaEnFiltradas) {
            preguntaEnFiltradas.seleccionada = false;
          }
        });

        this.seleccionadas = []; // Vacía la lista de seleccionadas
        this.seleccionarTodo = false; // Desmarca "Seleccionar Todo"

        // Muestra un mensaje de éxito
        this.toastr.success('Todas las preguntas han sido eliminadas de la lista de seleccionadas.', 'Éxito');
      }
    });


  }

  verPregunta(pregunta: Pregunta) {
    const modalRef = this.modalService.open(VerPreguntaModalComponent, { size: 'xl' });
    modalRef.componentInstance.pregunta = pregunta;
    modalRef.componentInstance.materia_id = this.materia_id;
  }

  guardarPreguntas() {

    if (this.seleccionadas.length < 30) {
      this.toastr.warning('Debes seleccionar al menos 30 preguntas para guardar.', 'Advertencia');
      return;
    }

    // Verifica si se ha seleccionado un grado y una materia
    if (!this.nombre) {
      this.toastr.warning('Debes digitar un nombre para el entrenamiento.', 'Advertencia');
      return;
    }

    // Verifica si se ha seleccionado un grado y una materia
    if (this.grado_id === 9999999 || this.materia_id === 0) {
      this.toastr.warning('Debes seleccionar un grado y una materia antes de guardar.', 'Advertencia');
      return;
    }

    // Extrae solo los IDs de las preguntas seleccionadas
    const idsSeleccionadas = this.seleccionadas.map(pregunta => pregunta.id);

    // Datos adicionales a guardar
    const datos = {
      id: this.programado_id,
      nombre: this.nombre, // Puedes cambiar esto por un campo de entrada del usuario
      grado_id: this.grado_id,
      materia_id: this.materia_id,
      preguntas_ids: idsSeleccionadas
    };

    // Aquí puedes enviar los datos al backend o realizar la acción que necesites
    // console.log('Datos a guardar:', datos);
    this.cargando = true;
    this._programadoService.guardarPreguntasProgramadas(datos)
      .pipe(
        catchError(error => {
          this.cargando = false;
          if (error.error.errors) {
            this.mostrarError(error.error.errors);
          } else {
            Swal.fire({
              title: "Error!",
              text: error.error.error,
              icon: "error"
            });
          }
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {
        this.toastr.success('Entrenamiento guardado correctamente.', 'Éxito');
        // Puedes realizar otras acciones después de guardar, como limpiar la lista de seleccionadas
        this.seleccionadas = [];
        this.seleccionarTodo = false;
        this.cargando = false;
        this.router.navigate(['/gestion-programado', this.materia_id]);
      });
  }

  mostrarMensaje(mensaje1: string) {
    this.toastr.error(mensaje1, 'Validación', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true
    });
  }

  mostrarError(errors: any) {
    let errorMessage = '';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorMessage += `${key}: ${errors[key]}<br>`;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: errorMessage
    });
  }

  cargarProgramado(id: number) {
    this.cargando = true;
    this._programadoService.getProgramadoById(id)
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
      .subscribe(
        (programado: any) => {
          // console.log(programado);
          this.nombre = programado.nombre;
          this.grado_id = programado.grado_id;
          this.filtrarPreguntas();

          // Marcar las preguntas seleccionadas
          programado.preguntas_ids.forEach((preguntaId: number) => {
            const pregunta = this.preguntas.find((p) => p.id === preguntaId);
            if (pregunta) {
              pregunta.seleccionada = true;
              this.seleccionadas.push(pregunta);
            }
          });

          this.cargando = false;
        }
      );
  }

}
