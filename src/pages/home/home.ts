import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ReunioesService } from "../../service/reunioes/reunioes.service";
import { Observable } from "rxjs/Observable";
import { Reuniao } from "../../models/reuniao/reuniao.model";

import { Platform, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  reunioesList$: Observable<Reuniao[]>

  constructor(public navCtrl: NavController, private reunioes: ReunioesService, private platform: Platform, private alert: AlertController) {
    this.platform.ready().then(() => {
        this.onNotification();
    });
    this.onNotification();
    this.reunioesList$ = this.reunioes
      .getReunioesList()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      });
  }

  async onNotification() {
    try {
      await this.platform.ready();
      FCMPlugin.onNotification((data) => {
        this.alert.create({
          message: data.message
        }).present();
      }, (result) => console.error(result));
    } catch (e) {
      console.log(e);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      FCMPlugin.getToken(
        function (token) {
          console.log(token); //I can get the token data
          this.local.set('tokenvalue', token); // the token value can't be saved to local storage like this
        },
        function (err) {
          console.log('error retrieving token: ' + err);
        }
      );
    })
  }
  

}
