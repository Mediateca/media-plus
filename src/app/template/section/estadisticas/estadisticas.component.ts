import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
    @Input() cuenta:any;
    @Input() idioma:string;
    @Input() ui:any;
    constructor() {}
}
