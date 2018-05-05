import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

    apiKey='4d5cf7b2c68cd67c';
    url;
  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
      this.url='http://api.wunderground.com/api/'+this.apiKey+'/conditions/q/';
  }
    
    getWeather(city,state){
        return this.http.get(this.url+'/'+state+'/'+city+'.json')
        .map(res=>res.json());
    }
    zmwWeather(zmw){
        return this.http.get(this.url+'/zmw:'+zmw+'.json').map(res=>res.json());
    }
//    ge(){
//        return this.home.gg();
//    }

}
