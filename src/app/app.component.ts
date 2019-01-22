import { Component } from '@angular/core';
import { InterfazService } from './generales/interfaz.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    interfaz:any;
    idioma:string = 'es';
    constructor(private UI: InterfazService) {
        this.UI.getUI().subscribe((data)=>{
            this.interfaz = data;
        });
    }
    cambioIdioma(idioma:string) {
        console.log(idioma);
        this.idioma = idioma;
    }
}
