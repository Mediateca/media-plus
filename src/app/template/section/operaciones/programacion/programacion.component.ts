import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var EXIF:any;

@Component({
    selector: 'ope-programacion',
    templateUrl: './programacion.component.html',
    styleUrls: ['./programacion.component.scss']
})
export class ProgramacionComponent {
    @Input() dia:any;
    @Input() idioma:string;
    @Input() ui:any;
    @Input() set cuenta(cuenta:any) {
        this.dataGrid = this.ui.template.section.operaciones.programacion.dataGrid;
    };
    @Output() cerrar:EventEmitter<any> = new EventEmitter();
    dataGrid:any;
    imgExif:any = {};
    rotaciones:any = {1: 'rotateZ(0deg)', 3: 'rotateZ(180deg)', 6: 'rotateZ(90deg)', 8: 'rotateZ(270deg)'};
    modalImagenAbierta:boolean = false;
    modal:any = {};
    constructor() {}
    volver(){
        this.cerrar.emit(false);
    }
    imagenCargada(e, i) {
        const raiz:any = this;
        const im = e.target;
        EXIF.getData(im, function() {
            raiz.imgExif[i] = EXIF.getAllTags(this);
        });
    }
    abreImagenModal(num:number) {
        const datos:any = this.dia.programaciones[num];
        this.modal.titulo = datos.archivo;
        this.modal.url = datos.rutaURL;
        this.modal.i = num;
        this.modalImagenAbierta = true;
    }
}
