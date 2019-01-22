import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InterfazService {
    constructor(private http: HttpClient) { }
    getUI():any {
        return this.http.get('./assets/interfaz.json');
    }
}
