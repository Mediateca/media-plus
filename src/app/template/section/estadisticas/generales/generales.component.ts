import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';
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
            this.obtieneMedias(this.limiteMedias);
            this.generaCombinado(this.rangoCombinado);
        }
    }
    dataOK:any = {};
    id:string;
    access_token:string;
    metricas = ['impressions','reach','follower_count','profile_views','website_clicks'];
    medias:any = {};
    limiteMedias:number = 25;
    chartOptions:any = {scaleShowVerticalLines: false, responsive: true};
    dataChart:any = {};
    colorsChart:Array<any> = [
        {backgroundColor: 'rgba(228,26,28,0.2)',borderColor: 'rgba(228,26,28,1)'},
        {backgroundColor: 'rgba(55,126,184,0.2)',borderColor: 'rgba(55,126,184,1)'},
        {backgroundColor: 'rgba(77,175,74,0.2)',borderColor: 'rgba(77,175,74,1)'},
        {backgroundColor: 'rgba(152,78,163,0.2)',borderColor: 'rgba(152,78,163,1)'},
        {backgroundColor: 'rgba(255,127,0,0.2)',borderColor: 'rgba(255,127,0,1)'},
        {backgroundColor: 'rgba(255,255,51,0.2)',borderColor: 'rgba(255,255,51,1)'},
        {backgroundColor: 'rgba(166,86,40,0.2)',borderColor: 'rgba(166,86,40,1)'},
        {backgroundColor: 'rgba(247,129,191,0.2)',borderColor: 'rgba(247,129,191,1)'},
        {backgroundColor: 'rgba(153,153,153,0.2)',borderColor: 'rgba(153,153,153,1)'}
    ];
    textoDropdown:any = {};
    rangosCombinado:Array<number> = [7,14,21,28];
    rangoCombinado:number = 0;
    filtrosCombinado:Array<string> = ['Última semana','Últimas dos semanas','Últimas tres semanas','Últimas cuatro semanas'];
    datosCombinado:any;
    constructor(private getIg:GetIgService) {};
    generaCombinado(limite:number){
        console.log('genera combinado',limite);
        this.rangoCombinado = limite;
        this.dataOK.combinado = false;
        this.datosCombinado = {
            'data': [],
            'labels': [],
            'leyenda': true,
            'tipo': 'line',
            'colores': this.chartOptions,
            'opciones': this.colorsChart
        };
        this.getIg.getData('user_insights',this.id,this.access_token,[0,-this.rangosCombinado[this.rangoCombinado]],this.metricas).subscribe(datos=>{
            for (let pack of datos.data) {
                var data:Array<number> = [];
                var labels:Array<string> = [];
                for (let valor of pack.values) {
                    data.push(valor.value);
                    labels.push(formatDate(valor.end_time, 'dd-MM-yyyy','en-US','-0500'));
                }
                this.datosCombinado.data.push({
                    'data':data,
                    'label':this.ui.template.section.estadisticas.generales[pack.name].grafico.serie[this.idioma]
                });
                if(this.datosCombinado.labels.length < 1) {this.datosCombinado.labels = labels}
            }
            this.dataOK.combinado = true;
        });
        /*
        var array:Array<any> = [];
        this.getIg.getData('media', this.id, this.access_token,[0,0], ['timestamp','like_count'], this.rangosCombinado[this.rangoCombinado]).subscribe(datos=>{
            datos.data.forEach((data,index)=>{
                array.push({'like_count':data.like_count,'timestamp':data.timestamp});
            });
            array.sort((a,b) => {
                if (a.timestamp > b.timestamp) {
                    return 1;
                }
                if (a.timestamp < b.timestamp) {
                    return -1;
                }
                return 0;
            });
        });
        */
    };
    obtieneMedias(limite:number){
        this.dataOK.posts = false;
        this.limiteMedias = limite;
        this.medias = {
            'data': [
                {
                    'data': [],
                    'label': this.ui.template.section.estadisticas.generales.post_likes.grafico.serie[this.idioma]
                }
            ],
            'labels':[],
            'leyenda': true,
            'tipo': 'line'
        };
        var array:Array<any> = [];
        var promedioLikes:number = 0;
        var arrayPromedio:Array<number> = [];
        this.getIg.getData('media',this.id,this.access_token,[0,0],['timestamp','like_count'],this.limiteMedias
                          ).subscribe(datos=>{
            datos.data.forEach((data,index)=>{
                array.push({'like_count':data.like_count,'timestamp':data.timestamp});
                promedioLikes += data.like_count;
            });
            promedioLikes = Math.round(promedioLikes / datos.data.length);
            array.sort((a,b) => {
                if (a.timestamp > b.timestamp) {
                    return 1;
                }
                if (a.timestamp < b.timestamp) {
                    return -1;
                }
                return 0;
            });
            for (let valor of array) {
                this.medias.data[0].data.push(valor.like_count);
                this.medias.labels.push(formatDate(valor.timestamp, 'dd-MM-yyyy','en-US','-0500'));
                arrayPromedio.push(promedioLikes);
            }
            this.medias.data.push({
                'data':arrayPromedio,
                'label':this.ui.template.section.estadisticas.generales.promedio[this.idioma]
            });
            this.dataOK.posts = true;
        });
    };
    obtieneDatos(metrica:Array<string>, rango:Array<number> = [0,-7],nombreRango:string='') {
        this.dataOK[metrica[0]] = false;
        this.getIg.getData('user_insights',this.id,this.access_token,rango,metrica).subscribe(datos=>{
            var salida:any = {'data':[],'labels':[],'tipo':'line','leyenda':true};
            for (let pack of datos.data) {
                var data:Array<number> = [];
                var labels:Array<string> = [];
                for (let valor of pack.values) {
                    data.push(valor.value);
                    labels.push(formatDate(valor.end_time, 'dd-MM-yyyy','en-US','-0500'));
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
