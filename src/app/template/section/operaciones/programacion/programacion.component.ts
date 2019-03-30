import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaPlusApiService } from '../../../../generales/media-plus-api/media-plus-api.service';

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
        this.dataGrid = this.ui.template.section.operaciones.programacion.dataGrid
    };
    @Output() cerrar:EventEmitter<any> = new EventEmitter();
    dataGrid:any;
    constructor() {}
    volver(){
        this.cerrar.emit(false);
    };
}
