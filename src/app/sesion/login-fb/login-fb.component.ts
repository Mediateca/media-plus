import { Component, OnInit, Input } from '@angular/core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'sesion-login-fb',
    template: `
        <button type="button" class="btn btn-icon btn-primary" *ngIf="!loggedIn" (click)="login()">
            <fa-icon [icon]="logoFB" size="lg"></fa-icon>
            <span class="texto">{{ui.sesion.loginFB.login.texto[idioma]}}</span>
        </button>
        <button type="button" class="btn btn-icon btn-danger" *ngIf="loggedIn" (click)="logout()">
            <clr-icon shape="logout"></clr-icon>
            <span class="texto">{{ui.sesion.loginFB.logout.texto[idioma]}}</span>
        </button>
    `,
    styles: [`
                @media (max-width: 768px) {
                    .texto {
                        display: none;
                    }
                }
            `]
})
export class LoginFBComponent implements OnInit {
    @Input() idioma:string;
    @Input() ui:any;
    logoFB = faFacebookSquare;
    user: SocialUser;
    loggedIn: boolean;
    constructor( private socialAuthService: AuthService ) {}
    login() {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }
    logout() {
        this.socialAuthService.signOut();
    }
    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }
}
