import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angular-6-social-login";

import { AppComponent } from './app.component';
import { LoginComponent } from './sesion/login/login.component';

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([{
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('364189737487924')
    }]);
    return config;
}

    @NgModule({
        declarations: [
            AppComponent,
            LoginComponent
        ],
        imports: [
            BrowserModule,
            SocialLoginModule
        ],
        providers: [{
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }],
        bootstrap: [AppComponent]
    })
export class AppModule { }
