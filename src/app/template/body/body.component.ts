import { Component, OnInit, Input } from '@angular/core';
import { AuthService, SocialUser } from 'angular-6-social-login';
import { GetIgService } from '../../ig_api/get-ig.service';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
    @Input() idioma:string;
    @Input() ui:any;
    user:SocialUser;
    loggedIn:boolean;
    cuentas:Array<any>;
    cuentaActual:number = 0;
    seccionActual:number = 0;
    constructor( private socialAuthService: AuthService,
                 private getIg: GetIgService) {}
    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            if (this.loggedIn) {
                this.getIg.getData('accounts','').subscribe((data)=>{
                    this.cuentas = data.accounts;
                    this.cuentas.forEach((val,i)=>{
                        this.getIg.getData('user',val.id).subscribe((datos)=>{
                            this.cuentas[i].data = datos;
                            if(i == this.cuentaActual) {
                                this.cuentas[i].activo = true;
                            } else {
                                this.cuentas[i].activo = false;
                            }
                        });
                    });
                });
            }
        });
    }
    cambioSeccion(seccion:any) {
        this.cuentas.forEach((val,i)=>{
            this.cuentas[i].activo = false;
        });
        this.cuentas[seccion.cuenta].activo = true;
        this.cuentaActual = seccion.cuenta;
        this.seccionActual = seccion.seccion;
    }
}
