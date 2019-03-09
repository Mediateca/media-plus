import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MediaPlusApiService {
    private api = 'https://pkqxsje2xb.execute-api.us-east-1.amazonaws.com/alpha/';
    constructor(private http: HttpClient) {};
    post(id:string, cadena:any) {
        return this.http.post(this.api+id,cadena);
    }
    get(id:string, cadena:string='') {
        return this.http.get(this.api+id+cadena);
    }
    xToken(token:string){
        return this.http.get(this.api+'mediaPlus?fb_exchange_token='+token);
    }
}
