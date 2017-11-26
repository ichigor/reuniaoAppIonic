import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reuniao } from "../../models/reuniao/reuniao.model";
import { ReunioesService } from "../../service/reunioes/reunioes.service";
import { ToastService } from "../../service/toast/toast.service";


@IonicPage()
@Component({
  selector: 'page-add-reuniao',
  templateUrl: 'add-reuniao.html',
})
export class AddReuniaoPage {

  reuniao: Reuniao = {
    titulo: '',
    dia: undefined
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private reunioes: ReunioesService, private toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReuniaoPage');
  }

  addReuniao(reuniao: Reuniao){
    this.reunioes.addReuniao(reuniao).then(ref=>{
      this.toast.show(`${reuniao.titulo} salvo com sucesso !`);
      this.navCtrl.setRoot('HomePage', {key: ref.key})
    });
  }

}
