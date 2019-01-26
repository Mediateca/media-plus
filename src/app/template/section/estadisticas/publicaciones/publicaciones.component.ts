import { Component, Input } from '@angular/core';
import { GetIgService } from '../../../../ig_api/get-ig.service';

@Component({
    selector: 'est-publicaciones',
    templateUrl: './publicaciones.component.html',
    styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent {
    @Input() cuenta:any;
    @Input() idioma:string;
    @Input() ui:any;
    medias:Array<any> = [];
    constructor(private getIg: GetIgService) {
        this.getIg.getData('media','').subscribe(datos=>{
            for (let media of datos.data) {
                this.getIg.getData('media_insights',media.id).subscribe(datos=>{
                    this.medias.push({
                        'id': datos.id,
                        'like_count': datos.like_count,
                        'comments_count': datos.comments_count,
                        'media_url': datos.media_url,
                        'timestamp': datos.timestamp
                    });
                });
            }
        });
    }
}
