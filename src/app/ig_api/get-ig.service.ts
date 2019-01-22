import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetIgService {
    constructor(private http: HttpClient) { }
    getData(tipo:string,id:string):any {
        switch (tipo) {
            case 'accounts':
                return this.http.get('./assets/accounts.json')
            case 'user':
                return this.http.get('./assets/'+id);
                break;
            default:
                return '';
        }
    }
}
