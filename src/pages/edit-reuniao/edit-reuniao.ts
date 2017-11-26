import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reuniao } from "../../models/reuniao/reuniao.model";
import { ReunioesService } from "../../service/reunioes/reunioes.service";
import { ToastService } from "../../service/toast/toast.service";


@IonicPage()
@Component({
  selector: 'page-edit-reuniao',
  templateUrl: 'edit-reuniao.html',
})
export class EditReuniaoPage {

  reuniao: Reuniao;

  constructor(public navCtrl: NavController, public navParams: NavParams, private reunioes: ReunioesService, private toast: ToastService) {
  }

  ionViewWillLoad() {
   this.reuniao = this.navParams.get('reuniao');
  }

  alterarReuniao(reuniao: Reuniao){
    this.reunioes.editReuniao(reuniao).then(()=>{
      this.toast.show(`${reuniao.titulo} alterado com sucesso !`);
      this.navCtrl.setRoot('HomePage');
    });
  }

  removerReuniao(reuniao:Reuniao){
    this.reunioes.removeReuniao(reuniao)
    .then(()=>{
      this.toast.show(`${reuniao.titulo} removido com sucesso !`);
      this.navCtrl.setRoot('HomePage');
    });
  }

}
