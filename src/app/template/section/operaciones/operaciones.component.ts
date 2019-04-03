import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MediaPlusApiService } from '../../../generales/media-plus-api/media-plus-api.service';

@Component({
    selector: 'app-operaciones',
    templateUrl: './operaciones.component.html',
    styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit {
    @Input() idioma:string;
    @Input() ui:any;
    @Input() set cuenta(cuenta:any) {
        if (cuenta) {
            this.id = cuenta.id;
            this.cargaFechas();
        }
    };
    @ViewChild("filaCalendario", {read: ElementRef}) filaCalendario: ElementRef;
    id:string;
    meses:Array<string> = [];
    annos:Array<number> = [];
    cambioMes:boolean = false;
    cambioAnno:boolean = false;
    numDia:number = new Date(Date.now()).getDate();
    numMes:number = new Date(Date.now()).getMonth();
    numAnno:number = new Date(Date.now()).getFullYear();
    diasEsteMes:Array<any>;
    anchoCelda:string;
    editaDia:any;
    constructor(private MediaAPI:MediaPlusApiService) {}
    cargaFechas() {
        let fecha = new Date();
        for (let i = 0;i < 12;i++) {
            fecha.setMonth(i);
            this.meses.push(fecha.toLocaleDateString(this.ui.template.section.operaciones.locale.mes[this.idioma],{month:'long'}).toUpperCase());
            this.annos.push(this.numAnno - 6 + i);
        }
        this.iniciaMes();
    };
    cambiarFecha(nuevoMes:number = 0) {
        let miFecha:Date = new Date(this.numAnno, this.numMes, 1);
        const miMes:number = miFecha.getMonth() + nuevoMes;
        miFecha.setMonth(miMes);
        this.numAnno = miFecha.getFullYear();
        this.numMes = miFecha.getMonth();
        this.cambioMes = false;
        this.cambioAnno = false;
        this.iniciaMes();
    }
    iniciaMes() {
        this.numMes = Number(this.numMes);
        this.numAnno = Number(this.numAnno);
        this.diasEsteMes = [];
        let esteMes:Date = new Date(this.numAnno, this.numMes, 1);
        const since:number = esteMes.getTime();
        const until:number = new Date(this.numAnno, this.numMes + 1, 1).getTime();
        const primerDia:number = esteMes.getDay();
        esteMes = new Date(this.numAnno, this.numMes + 1, 0);
        const numDias:number = esteMes.getDate();
        const finalDia:number = esteMes.getDay();
        const numDiasTotal:number = numDias + primerDia + (finalDia==0?-1:6-finalDia);
        this.MediaAPI.get(this.id,'?ver=programacion&since=' + since + '&until=' + until).subscribe(data=>{
            let datos:Array<any> = [];
            for (let i = 0; i < Object.keys(data).length; i++) {
                datos.push(data[i]);
            }
            for (let i = (primerDia * -1) + 2;i < (numDiasTotal - primerDia + 2);i++) {
                const dia:Date = new Date(this.numAnno, this.numMes, i);
                let estilo:string = 'dia' + String(esteMes.getMonth() - dia.getMonth());
                if (dia.toDateString() == new Date(Date.now()).toDateString()) {estilo += ' hoy'}
                let programaciones:Array<any> = [];
                let numProg:number = 0;
                datos.forEach((valor,indice)=>{
                    let fechaDB:Date = new Date(valor.timestamp);
                    if (fechaDB.getDate() == dia.getDate() && fechaDB.getMonth() == dia.getMonth()) {
                        valor.rutaURL = 'https://s3.amazonaws.com/mediaplus-posts/'+this.id+'/'+valor.archivo;
                        if (valor.caption.length > 1) {valor.numCaption = 1} else {valor.numCaption = 0}
                        if (valor.comentario.length > 1) {valor.numComentario = 1} else {valor.numComentario = 0}
                        valor.etiquetas = Object.keys(valor.tags.contents);
                        programaciones.push(valor);
                        numProg++;
                    }
                });
                this.diasEsteMes.push({
                    'dia': dia.getDate(),
                    'mes': dia.getMonth(),
                    'year': dia.getFullYear(),
                    'nomDia': dia.toLocaleDateString(this.ui.template.section.operaciones.locale.mes[this.idioma],{weekday:'long'}),
                    'nomMes': dia.toLocaleDateString(this.ui.template.section.operaciones.locale.mes[this.idioma],{month:'long'}),
                    'estilo': estilo,
                    'dateObj': dia,
                    'programaciones': programaciones,
                    'numProg': numProg
                });
            }
        });
    }
    abreDia(dia:any) {
        this.editaDia = dia;
    }
    ngOnInit() {
        setTimeout(()=>{
            this.anchoCelda = String(this.filaCalendario.nativeElement.offsetWidth / 14) + 'px';
        });
    }
}
