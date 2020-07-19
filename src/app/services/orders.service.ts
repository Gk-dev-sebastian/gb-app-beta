import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// operators
import { map } from 'rxjs/operators';
import { OrderModel } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  dbPath = 'orders';

  constructor( private afs:AngularFirestore ) { }

  // create new order

  createNew ( data ) {

    return this.afs.collection( this.dbPath ).add( data );

  }

  // get orders
  getOrders() {

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', true )
      .orderBy('status', 'asc')
      .where( 'status', '>', 'delivered')
      .orderBy('dateMade', 'desc')
      .orderBy('person.name'))
      .snapshotChanges()
      .pipe(
        map(
          (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()}))
        )
      )
  }

  getOrdersFinished() {

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', true )
      .where( 'status', '==', 'delivered' )
      .orderBy('dateMade', 'desc')
      .orderBy('person.name'))
      .snapshotChanges()
      .pipe(
        map(
          (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()}))
        )
      )
  }

  // get by id
  getById( id:string ) {

    return this.afs.collection( this.dbPath ).doc( id ).snapshotChanges().pipe(
      map( (res:any) => ({ id: res.payload.id, ...res.payload.data() }) )
    );
  }

  //update
  update( id:string, data:any ) {
    return this.afs.collection( this.dbPath ).doc( id ).update( data );
  }

  // disable
  disable( user:string, id:string ){

    const data = {
      active:false,
      dateLastUpdate: new Date().toLocaleDateString( 'en-us'),
      lastUpdateBy:user
    }

    return this.afs.collection( this.dbPath ).doc( id ).update( data );

  }

  // change status
  changeStatus( status:string, user:string, id:string ) {

    const data = {
      status: status,
      dateLastUpdate: new Date().toLocaleDateString( 'en-us'),
      lastUpdateBy:user
    };

    this.afs.collection( this.dbPath ).doc( id ).update( data );

  }

  delivered( user:string, id:string ) {

    const data = {
      status: 'delivered',
      dateLastUpdate: new Date().toLocaleDateString( 'en-us'),
      lastUpdateBy:user
    };

    this.afs.collection( this.dbPath ).doc( id ).update( data );

  }

  // search
  searchOrders( orderBy:string, term:string ) {

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', true)
      .orderBy( orderBy )
      .startAt( term.toLowerCase())
      .endAt( term.toLowerCase() + '\uf8ff')
      .limit( 500 ))
      .snapshotChanges()
      .pipe(
        map( (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()})) )
      );
  }

   /*==========================
        admin functions
  ============================*/

  getDesablesOrders() {

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', false ) )
      .snapshotChanges()
      .pipe(
          map( (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data() })))
      );

  }

  reActive( id:string ){

    let data = { active:true };
    return this.afs.collection( this.dbPath ).doc( id ).update( data );

  }

  delete( id:string ){
    return this.afs.collection( this.dbPath ).doc( id ).delete();
  }


}
