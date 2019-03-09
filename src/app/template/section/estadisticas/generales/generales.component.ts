import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { GetIgService } from '../../../../ig_api/get-ig.service';
import { MediaPlusApiService } from '../../../../generales/media-plus-api/media-plus-api.service';

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
            this.numDatosAPI = 100;
            this.obtieneAPIactivo();
        }
    }
    dataOK:any = {};
    id:string;
    access_token:string;
    metricas = ['impressions','reach','follower_count','profile_views','website_clicks'];
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
    rangosCombinado:Array<number> = [7,14,28,2];
    rangoCombinado:number = 0;
    filtrosCombinado:Array<string> = [];
    datosCombinado:any;
    medias:any = {};
    limiteMedias:number = 0;
    rangosMedias:Array<number> = [25,50,75,100];
    filtrosMedias:Array<string> = [];
    mediaAPIregla:any;
    deltas:any;
    acumulativos:any;
    numDatosAPI;
    constructor(private getIg:GetIgService, private MediaAPI: MediaPlusApiService) {};
    generaCombinado(limite:number){
        this.filtrosCombinado = [
            this.ui.template.section.estadisticas.generales.dropdown[0].texto[this.idioma],
            this.ui.template.section.estadisticas.generales.dropdown[1].texto[this.idioma],
            this.ui.template.section.estadisticas.generales.dropdown[2].texto[this.idioma],
            this.ui.template.section.estadisticas.generales.dropdown[3].texto[this.idioma]
        ];
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
    };
    obtieneMedias(limite:number){
        this.filtrosMedias = [];
        this.rangosMedias.forEach((valor,index)=>{
            this.filtrosMedias.push(this.ui.template.section.estadisticas.generales.like_count.inicial[this.idioma]+' '+valor+' '+this.ui.template.section.estadisticas.generales.like_count.final[this.idioma]);
        });
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
        let array:Array<any> = [];
        let promedioLikes:number = 0;
        let arrayPromedio:Array<number> = [];
        this.getIg.getData('media',this.id,this.access_token,[0,0],['timestamp','like_count'],this.rangosMedias[this.limiteMedias]
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
    obtieneAPIactivo() {
        const textosVista = this.ui.template.section.estadisticas.generales.capturas;
        this.deltas = {};
        this.acumulativos = {};
        this.MediaAPI.get(this.id,'?regla=estado').subscribe(datos=>{
            if (datos) {
                this.mediaAPIregla = datos;
                if (this.mediaAPIregla.creada) {
                    this.MediaAPI.get(this.id,`?limit=${this.numDatosAPI}&latest=true`).subscribe(datos=>{
                        if (datos != []) {
                            let data:any = this.ordenaArray(datos);
                            console.log(data.length, this.numDatosAPI);
                            this.deltas = {
                                'dataSet': [
                                    {'data': [], 'label': textosVista.likes[this.idioma]},
                                    {'data': [], 'label': textosVista.comentarios[this.idioma]}
                                ],
                                'labels': [],
                                'leyenda': true,
                                'chartType': 'line'
                            };
                            this.acumulativos = {
                                'dataSet': [
                                    {'data': [], 'label': textosVista.seguidores[this.idioma]},
                                    {'data': [], 'label': textosVista.seguidos[this.idioma]},
                                    {'data': [], 'label': textosVista.medias[this.idioma]}
                                ],
                                'labels': [],
                                'leyenda': true,
                                'chartType': 'line'
                            };
                            let total_likes:Array<number> = [];
                            let total_comments:Array<number> = [];
                            data.forEach((valor,index)=>{
                                let delta_likes:number;
                                let delta_comments:number;
                                total_likes.push(0);
                                total_comments.push(0);
                                valor.media.forEach((media,i)=>{
                                    total_likes[index] += media.like_count;
                                    total_comments[index] += media.comments_count;
                                });
                                if (index == 0) {
                                    delta_likes = 0;
                                    delta_comments = 0;
                                } else {
                                    delta_likes = total_likes[index]  - total_likes[index-1];
                                    delta_comments = total_comments[index]  - total_comments[index-1];
                                }
                                this.deltas.dataSet[0].data.push(delta_likes);
                                this.deltas.dataSet[1].data.push(delta_comments);
                                this.deltas.labels.push(new Date(valor.timestamp).toLocaleString('es-CO'));
                                this.acumulativos.dataSet[0].data.push(valor.followers_count);
                                this.acumulativos.dataSet[1].data.push(valor.follows_count);
                                this.acumulativos.dataSet[2].data.push(valor.media_count);
                                this.acumulativos.labels.push(new Date(valor.timestamp).toLocaleString('es-CO'));
                            });
                        }
                    });
                }
            }
        });
    }
    ordenaArray(array:any):any {
        array.sort((a,b) => {
            if (a.timestamp > b.timestamp) {
                return 1;
            }
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            return 0;
        });
        return array;
    }
    creaReglaMediaAPI() {
        const body:any = {
            'token': this.access_token
        };
        this.MediaAPI.post(this.id,body).subscribe(datos=>{
            this.obtieneAPIactivo();
        });
    }
    activaReglaMediaAPI() {
        console.log('Activar regla', this.mediaAPIregla.activa);
    }
}
