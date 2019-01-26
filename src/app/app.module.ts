import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { AppComponent } from './app.component';
import { ClarityModule/*, ClrFormsModule*/ } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { LoginFBComponent } from './sesion/login-fb/login-fb.component';
import { HeaderComponent } from './template/header/header.component';
import { BodyComponent } from './template/body/body.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';
import { ProfileComponent } from './template/section/profile/profile.component';
import { EstadisticasComponent } from './template/section/estadisticas/estadisticas.component';
import { GeneralesComponent } from './template/section/estadisticas/generales/generales.component';
import { PublicacionesComponent } from './template/section/estadisticas/publicaciones/publicaciones.component';

let config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("364189737487924")
    }
]);
export function provideConfig() {
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
            EstadisticasComponent,
            GeneralesComponent,
            PublicacionesComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            SocialLoginModule,
            ClarityModule,
            //ClrFormsModule,
            BrowserAnimationsModule,
            FontAwesomeModule,
            HttpClientModule,
            ChartsModule
        ],
        providers: [{
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }],
        bootstrap: [AppComponent]
    })
export class AppModule { }
