import { Usuario } from "./usuario.model";

export class Programado {


    constructor(

        public id: number,
        public nombre: string,
        public fecha: string,
        public materia_id: number,
        public grado_id: number,
        public user_id: number,
        public estado?: number,
        public usuario?: Usuario,
    ) {

    }

}