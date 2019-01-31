import { Component, Input } from '@angular/core';
import { GetIgService } from '../../../../ig_api/get-ig.service';

@Component({
    selector: 'est-publicaciones',
    templateUrl: './publicaciones.component.html',
    styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent {
    @Input() idioma:string;
    @Input() ui:any;
    @Input() set cuenta(cuenta:any) {
        if (cuenta) {
            this.id = cuenta.id;
            this.access_token = cuenta.access_token;
            this.obtieneDatos();
        }
    }
    id:string;
    access_token:string;
    metricas = ['like_count','comments_count','media_url','timestamp','media_type'];
    //metricas = ['timestamp'];
    medias:Array<any> = [];
    constructor(private getIg: GetIgService) {};
    obtieneDatos(){
        this.getIg.getData('media',this.id,this.access_token).subscribe(datos=>{
            var cont:number = 0;
            var todosMedias:Array<any> = [];
            for (let media of datos.data) {
                this.getIg.getData('media_data',media.id,this.access_token,[],this.metricas).subscribe(data=>{
                    todosMedias.push(data);
                    cont++;
                    if (cont == datos.data.length) {
                        this.medias = todosMedias.sort((a,b) => {
                            if (a.timestamp > b.timestamp) {
                                return -1;
                            }
                            if (a.timestamp < b.timestamp) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                });
            }
        });
    };
}
