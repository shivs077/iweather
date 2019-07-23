import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class WeatherProvider {
  apiKey = "36d8073ccc14ea379d7c642d7405e269";
  url;
  constructor(public http: Http) {
    console.log("Hello WeatherProvider Provider");
    this.url = "http://api.openweathermap.org/data/2.5/weather?q=";
  }

  getWeather(city, con) {
    // fetch(this.url + city + "," + con + "&APPID=" + this.apiKey).then(
    //   body => body
    // );

    return this.http
      .get(this.url + city + "," + con + "&APPID=" + this.apiKey)
      .map(res => res.json());
  }
  // zmwWeather(zmw) {
  //   return this.http
  //     .get(this.url + "/zmw:" + zmw + ".json")
  //     .map(res => res.json());
  // }
  //    ge(){
  //        return this.home.gg();
  //    }
}
