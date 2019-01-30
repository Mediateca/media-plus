import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetIgService {
    public hoy:number = Math.round(Date.now() / 1000);
    public dia:number = 86400;
    constructor(private http: HttpClient) { }
    getData(tipo:string,id:string,token:string='',rango:Array<number>=[0,0],metricas:Array<string>=['']):any {
        switch (tipo) {
            case 'media_insights':
                return this.http.get('./assets/'+id+'.json');
                break;
            case 'media':
                return this.http.get('./assets/media_mediateca.json');
                break;
            case 'user_insights':
                var until = this.hoy + (rango[0] * this.dia);
                var since = (rango[1] * this.dia)<2592000?(until + (rango[1] * this.dia)):until - 2592000;
                return this.http.get('https://graph.facebook.com/'+id+'/insights?metric='+metricas.join()+'&access_token='+token+'&period=day&since='+since+'&until='+until);
                //return this.http.get('https://graph.facebook.com/'+id+'/insights?metric=email_contacts,follower_count,impressions,profile_views,reach,website_clicks&access_token='+token+'&period=day&since='+since+'&until='+until);
                break;
            case 'accounts':
                return this.http.get('https://graph.facebook.com/'+id+'/accounts?access_token='+token);
                break;
            case 'ig_user':
                return this.http.get('https://graph.facebook.com/'+id+'?access_token='+token+'&fields=biography,followers_count,follows_count,id,ig_id,media_count,profile_picture_url,website,name,username');
                break;
            case 'user':
                return this.http.get('https://graph.facebook.com/'+id+'?access_token='+token+'&fields=instagram_business_account,access_token,name');
                break;
            default:
                return '';
        }
    }
}
