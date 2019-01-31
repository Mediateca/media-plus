import { Component, Input } from '@angular/core';
import { GetIgService } from '../../../../ig_api/get-ig.service';

@Component({
    selector: 'est-generales',
    templateUrl: './generales.component.html',
    styleUrls: ['./generales.component.scss']
})
export class GeneralesComponent {
    @Input() idioma:string;
    @Input() ui:any;
    @Input() set cuenta(cuenta:any) {
        if (cuenta) {
            this.id = cuenta.id;
            this.access_token = cuenta.access_token;
            this.metricas.forEach(metrica=>{
                this.textoDropdown[metrica] = this.ui.template.section.estadisticas.generales.dropdown[0].texto[this.idioma];
                this.obtieneDatos([metrica],[0,-7],this.textoDropdown[metrica]);
                this.dataOK[metrica] = false;
            });
        }
    }
    dataOK:any = {};
    id:string;
    access_token:string;
    metricas = ['impressions','reach','follower_count','profile_views','website_clicks'];
    chartOptions:any = {scaleShowVerticalLines: false, responsive: true};
    dataChart:any = {};
    textoDropdown:any = {};
    constructor(private getIg: GetIgService) {}
    obtieneDatos(metrica:Array<string>, rango:Array<number> = [0,-7],nombreRango:string='') {
        this.dataOK[metrica[0]] = false;
        this.getIg.getData('user_insights',this.id,this.access_token,rango,metrica).subscribe(datos=>{
            var salida:any = {'data':[],'labels':[],'tipo':'line','leyenda':true};
            for (let pack of datos.data) {
                var data:Array<number> = [];
                var labels:Array<string> = [];
                for (let valor of pack.values) {
                    data.push(valor.value);
                    labels.push(valor.end_time.substr(0,10));
                }
                salida.data.push({
                    'data':data,
                    'label':this.ui.template.section.estadisticas.generales[pack.name].grafico.serie[this.idioma]
                });
                salida.labels = labels;
            }
            if (metrica.length > 1) {
                this.dataChart.combinado = salida;
                this.textoDropdown.combinado = nombreRango;
                this.dataOK.combinado = true;
            } else {
                this.dataChart[metrica[0]] = salida;
                this.textoDropdown[metrica[0]] = nombreRango;
                this.dataOK[metrica[0]] = true;
            }
        });
    }
}
