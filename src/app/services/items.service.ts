import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// operators
import { finalize, map } from 'rxjs/operators';
// swal
import Swal from 'sweetalert2';
// models
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private dbPath = 'items';
  private filePath: string;
  imageUrl = '';
  imageName = '';

  constructor( private afs: AngularFirestore,
               private afStorage: AngularFireStorage ) { }


  /*==========================
        guests functions
  ============================*/

  // get all
  getItems() {

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', true )
      .orderBy('product')
      .orderBy('brand')
      .orderBy('model')
      .orderBy('color')
      .orderBy('size')
       )
      .snapshotChanges().pipe(
      map(
        (res: any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }) )
      )
    );
  }

  //get by products

  getByProducts( term:string ){

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', true )
      .where( 'product', '==', term )
      .orderBy('brand')
      .orderBy('model')
      .orderBy('color')
      .orderBy('size')
       )
      .snapshotChanges().pipe(
        map( (res: any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }) ) )
      );

  }

  // get by id
  getById( id: string ) {

    return this.afs.collection( this.dbPath ).doc( id ).snapshotChanges().pipe(
      map (
        (res: any) => ({ id: res.payload.id, ...res.payload.data() })
      )
    );
  }

  // get by ordered
  getByOrdered() {

    return this.afs.collection( this.dbPath, ref => ref
      .where('active', '==', true)
      .where( 'qty.qtyNewShipment', ">", 0)
      .orderBy('qty.qtyNewShipment', 'desc')
      .orderBy('brand')
      .orderBy('model')
      .orderBy('color')
      .orderBy('size')
       )
      .snapshotChanges().pipe(
        map( (res: any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }) ) )
      );
  }

  // create new item
  createnew( data: any, image: any) {

    if ( image != null ) {
      this.uploadWithImage( data, image );
    } else {
      this.uploadNoImage( data );
    }
  }

  // update
  updateItem( data: any, image: any) {

    if ( image != null ) {
      this.uploadWithImage( data, image );
    } else {
      this.uploadNoImage( data );
    }
  }

  // disable
  disable( id: string ) {

    const data = {
      active: false
    };

    return this.afs.collection( this.dbPath ).doc( id ).update( data );
  }

  // upload data & image
  uploadWithImage( data: any, image: any ) {

    // upload image
    this.filePath = `items/photo/${ image.name }`;
    const fileRef = this.afStorage.ref( this.filePath );
    const task = this.afStorage.upload( this.filePath, image );

    task.snapshotChanges()
      .pipe(
        finalize( () => {

          fileRef.getDownloadURL()
            .subscribe(
              fileurl => {

                this.imageUrl = fileurl;
                const dataRef: AngularFirestoreCollection<any> = this.afs.collection( this.dbPath );
                const newData: ItemModel = {

                  product: data.product.toLowerCase(),
                  brand: data.brand.toLowerCase(),
                  model: data.model.toLowerCase(),
                  color: data.color.toLowerCase(),
                  size: data.size.toLowerCase(),
                  qty: {
                    qty: data.qty,
                    qtyNewShipment: data.qtyNewShipment,
                    lastChange: data.lastChange,
                    lastChangeData: data.lastChangeData
                  },
                  price:{
                    listPrice: data.listPrice,
                    discount: data.discount,
                    total: data.listPrice - data.discount
                  },
                  photo: {
                    name: image.name,
                    url: this.imageUrl
                  },
                  description: data.desc,
                  active: true

                };

                if ( data.id != null ) {

                 dataRef.doc( data.id ).update( newData );

                 Swal.fire({
                  position: 'top-end',
                  imageUrl: "../../assets/img/icons/done.png",
                  //instead of imageSize use imageWidth and imageHeight
                  imageWidth: 100,
                  imageHeight: 100,
                  title: 'Item Updated',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    container: 'swal-update-container-class',
                    popup: 'swal-update-popup-class',
                    title: 'swal-update-title-class'
                  }
                 });

                 return;

                } else {

                 dataRef.add( newData );

                 Swal.fire({
                  position: 'top-end',
                  imageUrl: "../../assets/img/icons/done.png",
                  //instead of imageSize use imageWidth and imageHeight
                  imageWidth: 100,
                  imageHeight: 100,
                  title: 'Item Created',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    container: 'swal-update-container-class',
                    popup: 'swal-update-popup-class',
                    title: 'swal-update-title-class'
                  }
                 });

                 return;

                }

              }
            );

        })
      ).subscribe();

  }

  uploadNoImage( data: any ) {

    if ( data.photo != null ) {

      this.imageUrl = data.photo.url;
      this.imageName = data.photo.name;

    } else {

      this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/gb-kendall-orders.appspot.com/o/items%2Fphoto%2Fno-image.jpg?alt=media&token=c34ec5b3-784e-4459-abd2-364ea4eb0bfe';
      this.imageName = 'no-image';

    }

    const dataRef: AngularFirestoreCollection<any> = this.afs.collection( this.dbPath );
    const newData: ItemModel = {

      product: data.product.toLowerCase(),
      brand: data.brand.toLowerCase(),
      model: data.model.toLowerCase(),
      color: data.color.toLowerCase(),
      size: data.size.toLowerCase(),
      qty: {
        qty: data.qty,
        qtyNewShipment: data.qtyNewShipment,
        lastChange: data.lastChange,
        lastChangeData: data.lastChangeData
      },
      price:{
        listPrice: data.listPrice,
        discount: data.discount,
        total: data.listPrice - data.discount
      },
      photo: {
        name: this.imageName,
        url: this.imageUrl
      },
      description: data.desc,
      active: true

    };

    if ( data.id != null ) {

     dataRef.doc( data.id ).update( newData );

     Swal.fire({
      position: 'top-end',
      imageUrl: "../../assets/img/icons/done.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Item Updated',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: 'swal-update-container-class',
        popup: 'swal-update-popup-class',
        title: 'swal-update-title-class'
      }
     });

     return;

    } else {

     dataRef.add( newData );

     Swal.fire({
      position: 'top-end',
      imageUrl: "../../assets/img/icons/done.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Item Created',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: 'swal-update-container-class',
        popup: 'swal-update-popup-class',
        title: 'swal-update-title-class'
      }
     });

     return;

    }

  }

  // qty
  changeQty( data:any, id: string ) {

    const newData = {
      qty:{
        ...data
      }
    };

    this.afs.collection( this.dbPath ).doc( id ).update( newData );


  }

  //get qty
  getQty( id:string ) {

   return this.afs.collection( this.dbPath ).doc( id ).snapshotChanges().pipe(
      map ( res => res.payload.get( 'qty.qty' ) )
    );

  }

  getStatus( id:string ){

    return this.afs.collection( this.dbPath ).doc( id ).snapshotChanges().pipe(
      map ( res => res.payload.get( 'active' ) )
    );

  }

  // search
   searchItem( orderBy: string, term: string ) {

    return this.afs.collection(this.dbPath, ref => ref
    .where( 'active', '==', true )
    .orderBy( orderBy )
    .startAt(term.toLowerCase())
    .endAt(term.toLowerCase() + '\uf8ff')
    .limit(500))
    .snapshotChanges().pipe(
      map(
        (res: any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()}))
      )
    );

  }

  /*==========================
        admin functions
  ============================*/

  getDesablesItems() {

    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', false ) )
      .snapshotChanges()
      .pipe(
          map( (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data() })))
      );
  }

  reActive( id:string ){

    let data = { active:true };
    this.afs.collection( this.dbPath ).doc( id ).update( data );

  }

  delete( id:string ){
    return this.afs.collection( this.dbPath ).doc( id ).delete();
  }

}
