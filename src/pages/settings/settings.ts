import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Storage } from "@ionic/storage";

import { TabsPage } from "../tabs/tabs";
import { AlertController } from "ionic-angular";

@Component({
  selector: "settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  city: string;
  state: string;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.storage.get("location").then(val => {
      if (val != null) {
        let location = JSON.parse(val);
        this.city = location.city;
        this.state = location.state;
      } else {
        this.city = "Delhi";
        this.state = "IN";
      }
    });
  }
  saveForm() {
    let location = {
      city: this.city,
      state: this.state.toUpperCase()
    };
    this.storage.set("location", JSON.stringify(location));
    //        this.navCtrl.push(HomePage);
    //         this.navCtrl.parent.select(0);
  }
  //    presentAlert() {
  //  let alert = this.alertCtrl.create({
  //    title: 'Low battery',
  //    subTitle: '10% of battery remaining',
  //    buttons: ['Dismiss']
  //  });
  //  alert.present();
  //}
}
