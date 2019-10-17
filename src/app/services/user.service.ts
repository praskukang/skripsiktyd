import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserProfile {
  id?: string;
  jabatan: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<UserProfile>;

  private users: Observable<UserProfile[]>;

  constructor(db: AngularFirestore, private afa: AngularFireAuth) {
    this.userCollection = db.collection<UserProfile>('users', ref => ref.orderBy ('createdAt', 'desc'));

    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUsers() {
    return this.users;
  }

  addUser(user: UserProfile) {
    return this.userCollection.add(user);
  }

  updateUser(user: UserProfile, id: string) {
    return this.userCollection.doc(id).update(user);
  }

  getUser(id) {
    return this.userCollection.doc<UserProfile>(id).valueChanges();
  }

  removeUser(id) {
    return this.userCollection.doc(id).delete();
  }
}
