import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angular-6-social-login";
import { AppComponent } from './app.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { LoginFBComponent } from './sesion/login-fb/login-fb.component';
import { HeaderComponent } from './template/header/header.component';
import { BodyComponent } from './template/body/body.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';
import { ProfileComponent } from './template/section/profile/profile.component';
import { EstadisticasComponent } from './template/section/estadisticas/estadisticas.component';

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
            LoginFBComponent,
            HeaderComponent,
            BodyComponent,
            SidenavComponent,
            ProfileComponent,
            EstadisticasComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            SocialLoginModule,
            ClarityModule,
            ClrFormsNextModule,
            BrowserAnimationsModule,
            FontAwesomeModule,
            HttpClientModule,
            ChartsModule
        ],
        providers: [{
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }],
        bootstrap: [AppComponent]
    })
export class AppModule { }
