import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Kas {
  id?: string;
  debit: string;
  kredit: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class KasService {

  private kasCollection: AngularFirestoreCollection<Kas>;

  private kass: Observable<Kas[]>;

  constructor(db: AngularFirestore) {
    this.kasCollection = db.collection<Kas>('kass');

    this.kass = this.kasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getKass() {
    return this.kass;
  }

  addKas(kas: Kas) {
    return this.kasCollection.add(kas);
  }

  updateKas(kas: Kas, id: string) {
    return this.kasCollection.doc(id).update(kas);
  }

  getKas(id) {
    return this.kasCollection.doc<Kas>(id).valueChanges();
  }

  removeKas(id) {
    return this.kasCollection.doc(id).delete();
  }
}
