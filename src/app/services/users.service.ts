import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = 'admins';

  constructor( private afs:AngularFirestore ) {}

  //create new user
  newUser( data:any ) {

      const dataRef: AngularFirestoreCollection<any> = this.afs.collection( this.dbPath );
      dataRef.add( data );
      return false;

  }

  //get by id
  getById( id:any ) {

    return this.afs.collection( this.dbPath ).doc( id ).snapshotChanges().pipe(
      map( (res:any) => ({ id: res.payload.id, ...res.payload.data() }))
    );

  }

  // get users
  getUsers(){

    return this.afs.collection( this.dbPath ).snapshotChanges().pipe(
      map( (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }) ))
    );

  }

  // email validate
  emailValidate( email:string) {

     return this.afs.collection( this.dbPath, ref => ref.where('email', '==', email) ).valueChanges();

  }

  // update user
  updateUser( data ) {

    const id = data.id;
    const newData:UserModel = {
      user: data.user.toLowerCase(),
      role: data.role,
      email: data.email.toLowerCase(),
      photo: '',
      active: data.active
    }

    this.afs.collection( this.dbPath ).doc( id ).update( newData );

  }


}
