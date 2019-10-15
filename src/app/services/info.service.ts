import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Info {
  id?: string;
  judul: string;
  isiberita: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private infoCollection: AngularFirestoreCollection<Info>;

  private infos: Observable<Info[]>;

  constructor(db: AngularFirestore) {
    this.infoCollection = db.collection<Info>('infos', ref => ref.orderBy ('createdAt', 'desc'));

    this.infos = this.infoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getInfos() {
    return this.infos;
  }

  addInfo(info: Info) {
    return this.infoCollection.add(info);
  }

  updateInfo(info: Info, id: string) {
    return this.infoCollection.doc(id).update(info);
  }

  getInfo(id) {
    return this.infoCollection.doc<Info>(id).valueChanges();
  }

  removeInfo(id) {
    return this.infoCollection.doc(id).delete();
  }
}
