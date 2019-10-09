import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserProfile {
  id?: string;
  fname: string;
  lname: string;
  alamat: string;
  jabatan: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<UserProfile>;

  private users: Observable<UserProfile[]>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<UserProfile>('users');

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
