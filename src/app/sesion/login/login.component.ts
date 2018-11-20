import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angular-6-social-login';

@Component({
    selector: 'sesion-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private user: SocialUser;
    private loggedIn: boolean;
    constructor( private socialAuthService: AuthService ) {}
    public login() {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
            console.log('log',userData);
        });
    }
    public logout() {
        this.socialAuthService.signOut();
    }
    ngOnInit() {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.2&appId=386766601695791&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            console.log(this.user, this.loggedIn);
        });
    }
}