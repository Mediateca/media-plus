import { Component, Input } from '@angular/core';
import { GetIgService } from '../../../../ig_api/get-ig.service';

@Component({
    selector: 'est-generales',
    templateUrl: './generales.component.html',
    styleUrls: ['./generales.component.scss']
})
export class GeneralesComponent {
    @Input() cuenta:any;
    @Input() idioma:string;
    @Input() ui:any;
    chartOptions = {scaleShowVerticalLines: false, responsive: true};
    seguidores:any;
    impresiones:any;
    constructor(private getIg: GetIgService) {
        this.getIg.getData('user_insights','').subscribe(datos=>{
            for (let pack of datos.data) {
                if (pack.name == 'follower_count') {
                    this.seguidores = {
                        'data': [{
                            data:[],
                            label:this.ui.template.section.estadisticas.generales.seguidores.grafico.serieA[this.idioma]
                        }],
                        'labels': [],
                        'tipo': 'line',
                        'leyenda': true,
                        'colors': [{backgroundColor:'rgba(20,200,20,0.2)',borderColor:'rgba(20,200,20,1)'}]
                    };
                    for (let valor of pack.values) {
                        this.seguidores.labels.push(valor.end_time.substr(0,10));
                        this.seguidores.data[0].data.push(valor.value);
                    }
                }
                if (pack.name == 'impressions') {
                    this.impresiones = {
                        'data': [{
                            data:[],
                            label:this.ui.template.section.estadisticas.generales.impresiones.grafico.serieA[this.idioma]
                        }],
                        'labels': [],
                        'tipo': 'line',
                        'leyenda': true,
                        'colors': [{backgroundColor:'rgba(200,20,20,0.2)',borderColor:'rgba(200,20,20,1)'}]
                    };
                    for (let valor of pack.values) {
                        this.impresiones.labels.push(valor.end_time.substr(0,10));
                        this.impresiones.data[0].data.push(valor.value);
                    }
                }
            }
        });
    }
}
