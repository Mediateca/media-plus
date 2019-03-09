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
// Ojo a: 17841589552079306/top_media?fields=caption,like_count&user_id=17841404017502153
//           TAG -|                                                       mi IG user -|
