import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
    @Input() cuenta:any;
    @Input() activo:boolean;
    @Input() num:number;
    @Input() idioma:string;
    @Input() ui:any;
    @Output() seccion:EventEmitter<any> = new EventEmitter();
    numSeccion:number = 0;
    constructor() {}
    abreSection(num) {
        this.numSeccion = num;
        var salida:any = {'cuenta':this.num,'seccion':num};
        this.seccion.emit(salida);
    }
}
