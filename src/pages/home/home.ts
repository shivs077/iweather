import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { WeatherProvider } from "../../providers/weather/weather";
import { Storage } from "@ionic/storage";
import { SettingsPage } from "../settings/settings";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  weather: any;
  zmw: any;
  flag: number = 0;
  location: {
    city: string;
    state: string;
  };
  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage
  ) {}

  //ionViewWillEnter(){

  //       else{
  ionViewWillEnter() {
    this.storage.get("location").then(val => {
      if (val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: "Delhi",
          state: "IN"
        };
      }

      this.weatherProvider
        .getWeather(this.location.city, this.location.state)
        .subscribe(weather => {
          this.weather = weather;
        });
    });
    //       }
    //   });
  }
}
