import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import {Storage} from '@ionic/storage';
import {SettingsPage} from '../settings/settings'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
    zmw:any;
    con:string="IN";
    flag:number=0;
    location:{
        city:string,
        state:string
    }
  constructor(public navCtrl: NavController,
    private weatherProvider:WeatherProvider,
    private storage:Storage) {

  }

    
//ionViewWillEnter(){
   
//       else{
    ionViewWillEnter(){
    this.storage.get('location').then((val)=>{
       if(val!=null)
           {
               this.location=JSON.parse(val);
           }else{
           this.location={
               city:'Delhi',
               state:'Delhi'
           }
           }
        
         this.weatherProvider.getWeather(this.location.city,this.con).subscribe(weather=>{
       
            
             if(typeof(weather.current_observation)=='undefined')
               { for(let i=0;i<weather.response.results.length;i++)
                   {   for(let j=1;j<this.location.state.length;j++){
                       if(weather.response.results[i].state==this.location.state[0]+this.location.state[j]){
                   this.zmw=weather.response.results[i].zmw;
                           this.flag=1;
                   }}}
           
                
             this.weatherProvider.zmwWeather(this.zmw).subscribe(weather=>{
                 
                 this.weather=weather.current_observation;
             });
                
               }else{
                    this.weather=weather.current_observation;
               }

             //             if(this.weather.display_location.city=="Noida"){
//                 this.weather.display_location.city="Delhi";}
    });
    });
//       }
//   });
 
   
}
   

}
