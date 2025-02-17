import { Component, Input } from '@angular/core';
import { Pregunta } from '../../../../models/pregunta.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-pregunta-modal',
  templateUrl: './ver-pregunta-modal.component.html',
  styleUrl: './ver-pregunta-modal.component.css'
})
export class VerPreguntaModalComponent {
  @Input() pregunta!: Pregunta;
  @Input() materia_id!: number;

  constructor(public modal: NgbActiveModal) { }
}
