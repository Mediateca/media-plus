import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('inVisible', [
            state('visible', style({opacity: '0.4'})),
            state('invisible', style({opacity: '0'})),
            transition('visible => invisible', [
                animate('0.1s ease-in')
            ]),
            transition('invisible => visible', [
                animate('0.1s ease-out')
            ]),
        ]),
    ]
})
export class SliderComponent implements AfterViewInit {
    @Input() medias:Array<any>;
    @ViewChild('sliderWrap') sliderWrap:ElementRef;
    anchoTotal:number;
    anchoSlider:number;
    altoSlider:number;
    posSlider:number = 0;
    numSlider:number = 0;
    constructor() {};
    ngAfterViewInit() {
        var init = window.setTimeout(()=>{
            this.anchoSlider = this.sliderWrap.nativeElement.offsetWidth;
            this.altoSlider = this.sliderWrap.nativeElement.offsetHeight;
            this.anchoTotal = this.medias.length * this.anchoSlider;
        });
    }
    avanzaSlider(av:number) {
        this.numSlider += av;
        if (this.numSlider >= this.medias.length) {
            this.numSlider = 0;
        }
        if (this.numSlider < 0) {
            this.numSlider = this.medias.length - 1;
        }
        this.posSlider = this.numSlider * this.anchoSlider * -1;
    }
}
