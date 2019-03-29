import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';

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
            this.cargaFechas();
        }
    };
    @ViewChild("filaCalendario", {read: ElementRef}) filaCalendario: ElementRef;
    constructor() { }
    meses:Array<string> = [];
    annos:Array<number> = [];
    cambioMes:boolean = false;
    cambioAnno:boolean = false;
    numDia:number = new Date(Date.now()).getDate();
    numMes:number = new Date(Date.now()).getMonth();
    numAnno:number = new Date(Date.now()).getFullYear();
    diasEsteMes:Array<any>;
    anchoCelda:string = '2em';
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
        const primerDia:number = esteMes.getDay();
        esteMes = new Date(this.numAnno, this.numMes + 1, 0);
        const numDias:number = esteMes.getDate();
        const finalDia:number = esteMes.getDay();
        const numDiasTotal:number = numDias + primerDia + (finalDia==0?-1:6-finalDia);
        for (let i = (primerDia * -1) + 2;i < (numDiasTotal - primerDia + 2);i++) {
            const dia:Date = new Date(this.numAnno, this.numMes, i);
            let estilo:string = 'dia' + String(esteMes.getMonth() - dia.getMonth());
            if (dia.toDateString() == new Date(Date.now()).toDateString()) {estilo += ' hoy'}
            this.diasEsteMes.push({
                'dia': dia.getDate(),
                'mes': dia.getMonth(),
                'year': dia.getFullYear(),
                'nomDia': dia.toLocaleDateString(this.ui.template.section.operaciones.locale.mes[this.idioma],{weekday:'long'}),
                'nomMes': dia.toLocaleDateString(this.ui.template.section.operaciones.locale.mes[this.idioma],{month:'long'}),
                'estilo': estilo
            });
        }
    }
    ngOnInit() {
        this.anchoCelda = String(this.filaCalendario.nativeElement.offsetWidth / 14)+'px';
    }
}
