import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() idioma:string;
    @Input() ui:any;
    @Output() cambioIdioma:EventEmitter<any> = new EventEmitter();
    constructor() {}
    cambiaIdioma(idioma:string) {
        this.cambioIdioma.emit(idioma);
    }
}
