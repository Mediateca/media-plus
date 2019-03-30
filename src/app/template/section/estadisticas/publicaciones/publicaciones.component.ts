import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GetIgService } from '../../../../ig_api/get-ig.service';

@Component({
    selector: 'est-publicaciones',
    templateUrl: './publicaciones.component.html',
    styleUrls: ['./publicaciones.component.scss'],
    animations: [
        trigger('inVisible', [
            state('visible', style({top: '0%'})),
            state('invisible', style({top: '100%'})),
            transition('visible => invisible', [
                animate('0.2s ease-in')
            ]),
            transition('invisible => visible', [
                animate('0.4s ease-out')
            ]),
        ])
    ]
})
export class PublicacionesComponent {
    @Input() idioma:string;
    @Input() ui:any;
    @Input() set cuenta(cuenta:any) {
        if (cuenta) {
            this.id = cuenta.id;
            this.access_token = cuenta.access_token;
            this.obtieneDatos(this.limiteMedias);
        }
    }
    infoVisible:Array<boolean> = [];
    id:string;
    access_token:string;
    filtroOrden:number = 0;
    sentidoOrden:number = -1;
    sentidoTipo:Array<string> = ['ascendente','descendente'];
    sentidoActual:number = 1;
    metricas = [
        'timestamp',
        'like_count',
        'comments_count',
        'media_url',
        'media_type',
        'children{media_url,media_type}',
        'thumbnail_url',
        'caption',
        'comments'
    ];
    medias:Array<any> = [];
    limiteMedias:number = 25;
    mediaActual:number;
    modalInfo:boolean = false;
    constructor(private getIg: GetIgService) {};
    obtieneDatos(limite:number){
        this.medias = [];
        this.limiteMedias = limite;
        this.getIg.getData('media',this.id,this.access_token,[0,0],this.metricas,this.limiteMedias).subscribe(datos=>{
            datos.data.forEach((data,index)=>{
                if (data.media_url) {
                    this.infoVisible.push(false);
                    this.medias.push(data);
                }
            });
            this.ordenaArray(this.medias,this.metricas[this.filtroOrden],this.sentidoOrden);
        });
    };
    cambiaSentido(num) {
        this.sentidoActual = num;
        if (num == 0) {
            this.sentidoOrden = 1;
        } else {
            this.sentidoOrden = -1;
        }
        this.ordenaArray(this.medias,this.metricas[this.filtroOrden],this.sentidoOrden);
    }
    cambiaFiltro(num){
        this.filtroOrden = num;
        this.ordenaArray(this.medias,this.metricas[this.filtroOrden],this.sentidoOrden);
    };
    ordenaArray(array:Array<any>,propiedad:any,orden:number) {
        array.sort((a,b) => {
            if (a[propiedad] > b[propiedad]) {
                return 1 * orden;
            }
            if (a[propiedad] < b[propiedad]) {
                return -1 * orden;
            }
            return 0;
        });
    }
    abreModal(num:number) {
        this.modalInfo = false;
        this.mediaActual = num;
        this.modalInfo = true;
    }
}
