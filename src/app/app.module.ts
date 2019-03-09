import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
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
import { ModalComponent } from './template/section/estadisticas/modal/modal.component';
import { SliderComponent } from './generales/slider/slider.component';
import { CardChartComponent } from './generales/card-chart/card-chart.component';

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
            PublicacionesComponent,
            ModalComponent,
            SliderComponent,
            CardChartComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            SocialLoginModule,
            ClarityModule,
            BrowserAnimationsModule,
            FontAwesomeModule,
            HttpClientModule,
            ChartsModule
        ],
        providers: [
            {
                provide: AuthServiceConfig,
                useFactory: provideConfig
            }],
        bootstrap: [AppComponent]
    })
export class AppModule { }
