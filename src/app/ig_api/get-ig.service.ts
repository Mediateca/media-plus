import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetIgService {
    constructor(private http: HttpClient) { }
    getData(tipo:string,id:string):any {
        switch (tipo) {
            case 'media_insights':
                return this.http.get('./assets/'+id+'.json');
                break;
            case 'user_insights':
                return this.http.get('./assets/insights_mediateca.json');
                break;
            case 'media':
                return this.http.get('./assets/media_mediateca.json');
                break;
            case 'accounts':
                return this.http.get('./assets/accounts.json');
                break;
            case 'user':
                return this.http.get('./assets/'+id);
                break;
            default:
                return '';
        }
    }
}
