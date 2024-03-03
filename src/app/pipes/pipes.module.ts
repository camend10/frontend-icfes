import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TipoPerfilPipe } from './tipo-perfil.pipe';
import { EstadoPipe } from './estado.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    TipoPerfilPipe,
    EstadoPipe
  ],
  imports: [],
  exports: [
    ImagenPipe,
    TipoPerfilPipe,
    EstadoPipe
  ]
})
export class PipesModule { }
