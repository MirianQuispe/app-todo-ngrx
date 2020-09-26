

export class Todo{
    id          : number;
    texto       : string;
    completado  : boolean;

    constructor(_texto: string){
        this.texto      =_texto;
        this.id         = Math.random();
        this.completado = false;
    }
}