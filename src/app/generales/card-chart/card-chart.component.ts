import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card-chart',
    templateUrl: './card-chart.component.html',
    styleUrls: ['./card-chart.component.scss']
})
export class CardChartComponent {
    @Input() datos:any;
    @Input() cardHeader:string;
    @Input() filtros:Array<string>;
    @Input() datosOK:boolean;
    @Output() cambiaFiltro:EventEmitter<any> = new EventEmitter();
    filtroActual:number = 0;
    constructor() {}
    cambiarFiltro(num:number) {
        this.filtroActual = num;
        this.cambiaFiltro.emit(this.filtroActual);
    }
}
