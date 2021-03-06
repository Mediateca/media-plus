import { Component, OnInit, Input } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { GetIgService } from '../../ig_api/get-ig.service';
import { MediaPlusApiService } from '../../generales/media-plus-api/media-plus-api.service';

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
    cuentas:Array<any> = [];
    cuentaActual:number = 0;
    seccionActual:number = 0;
    constructor(private socialAuthService: AuthService,
                 private getIg: GetIgService,
                 private MediaAPI: MediaPlusApiService) {}
    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            if (this.loggedIn) {
                this.getIg.getData('accounts',this.user.id,this.user.authToken).subscribe(data=>{
                    let cont:number = 0;
                    data.data.forEach((val,i)=>{
                        this.getIg.getData('user',val.id,val.access_token).subscribe(datos=>{
                            this.MediaAPI.xToken(val.access_token).subscribe(resp=>{
                                const xToken = JSON.parse(String(resp));
                                if (datos.instagram_business_account) {
                                    this.getIg.getData('ig_user', datos.instagram_business_account.id, xToken.access_token).subscribe(info=>{
                                        this.cuentas[cont] = datos;
                                        this.cuentas[cont].info = info;
                                        this.cuentas[cont].info.access_token = xToken.access_token;
                                        if(cont == this.cuentaActual) {
                                            this.cuentas[cont].activo = true;
                                        } else {
                                            this.cuentas[cont].activo = false;
                                        }
                                        cont++;
                                    });
                                }
                            });
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
