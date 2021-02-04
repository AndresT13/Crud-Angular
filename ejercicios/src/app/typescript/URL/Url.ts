export class Xmen {

    constructor(
        private nombre : string,
        private poder  : string,
        private clave  : string
    ) { }

    capacidades() {
        console.log(`${this.nombre}- ${this.poder} - ${this.clave}`);
    }
}