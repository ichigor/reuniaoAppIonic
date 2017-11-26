
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Reuniao } from "../../models/reuniao/reuniao.model";

@Injectable()
export class ReunioesService{

    private reunioesRef = this.db.list<Reuniao>('reunioes');

    constructor(private db : AngularFireDatabase){}

    getReunioesList(){
        return this.reunioesRef;
    }

    addReuniao(reuniao: Reuniao){
        return this.reunioesRef.push(reuniao);
    }

    editReuniao(reuniao: Reuniao){
        return this.reunioesRef.update(reuniao.key, reuniao);
    }

    removeReuniao(reuniao: Reuniao){
        return this.reunioesRef.remove(reuniao.key);
    }


}