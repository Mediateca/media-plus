import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'est-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent{
    @Input() contenido:any;
    @Input() estado:boolean;
    @Input() ui:any;
    @Input() idioma:string;
    @Output() cerrar:EventEmitter<any> = new EventEmitter();
    constructor(){};
    cierra(){
        this.cerrar.emit(false);
    };
}
