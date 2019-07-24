import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { WeatherProvider } from "../../providers/weather/weather";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  weather: any;
  flag: number = 0;
  errflag: number = 0;
  city: string;
  state: string;
  location: {
    city: string;
    state: string;
  };
  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    public load: LoadingController
  ) {
    this.flag = 0;
  }

  //ionViewWillEnter(){

  //       else{
  ionViewWillEnter() {
    this.storage.get("location").then(val => {
      if (val != null) {
        this.location = JSON.parse(val);
        if (
          this.city === this.location.city &&
          this.state === this.location.state
        ) {
          this.flag = 0;
        } else {
          this.city = this.location.city;
          this.state = this.location.state;
          this.flag = 1;
        }
      } else {
        this.location = {
          city: "Delhi",
          state: "IN"
        };
      }

      if (this.flag) {
        this.weather = null;
        this.errflag = 0;
        let loadd = this.load.create({
          content: "fetching data, please wait..."
        });
        loadd.present();

        this.weatherProvider
          .getWeather(this.location.city, this.location.state)
          .subscribe(
            weather => {
              this.weather = weather;
            },
            err => {
              this.errflag = 1;
              loadd.dismiss();
            },
            () => loadd.dismiss()
          );
      }
    });
  }
}
