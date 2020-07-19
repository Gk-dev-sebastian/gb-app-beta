import { Injectable } from '@angular/core';
// firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// operators
import { finalize, map } from 'rxjs/operators';
// swal
import Swal from 'sweetalert2';
// model
import { StudentModel } from '../models/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private dbPath = 'students';
  private filePath: string;
  imageUrl = '';
  imageName = '';

  constructor( private afs: AngularFirestore,
               private afStorage: AngularFireStorage ) { }

  // create new student
  createNew( data: any, image: any  ) {

    if ( image != null ) {
      this.uploadWithImage( data, image );
    } else {
      this.uploadNoImage( data );
    }
    return;

  }

  // get students
  getStudent() {
    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', true ) ).snapshotChanges().pipe(
        map(
          (res: any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()}))
        )
      );
  }

  // get student by id
  getById( doc: string ) {
    return this.afs.collection( this.dbPath ).doc( doc ).snapshotChanges().pipe(
      map( (res:any) => ({ id: res.payload.id, ...res.payload.data() }))
    );
  }

  // update student
  updateStudent( data: any, image: any ) {

    if ( image != null ) {
      this.uploadWithImage( data, image );
    } else {
      this.uploadNoImage( data );
    }
    return;

  }

  // delete student
  deleteStudent( doc: string ) {

    const data = {
      active: false
    };

    return this.afs.collection( this.dbPath ).doc( doc ).update( data );

  }

  // upload data
  uploadWithImage( data: any, image: any) {

    this.filePath = `students/photo/${ image.name }`;
    const fileRef = this.afStorage.ref( this.filePath );
    const task = this.afStorage.upload( this.filePath, image );

    task.snapshotChanges()
      .pipe( finalize( () => {

        fileRef.getDownloadURL()
          .subscribe( fileurl => {

              this.imageUrl = fileurl;
              const dataRef: AngularFirestoreCollection<any> = this.afs.collection( this.dbPath );
              const newData: StudentModel = {

                                              name: data.name.toLowerCase(),
                                              lastname: data.lastname.toLowerCase(),
                                              category: data.category,
                                              class: data.class,
                                              age: data.age,
                                              rank: data.rank,
                                              email: data.email,
                                              active: true,
                                              photo: {
                                                      file: image.name,
                                                      url: this.imageUrl
                                                     }
              };

              if ( data.id != null ) {
                dataRef.doc( data.id ).update( newData );

                Swal.fire({
                  position: 'top-end',
                  imageUrl: "../../assets/img/icons/done.png",
                  //instead of imageSize use imageWidth and imageHeight
                  imageWidth: 100,
                  imageHeight: 100,
                  title: 'Student Updated',
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
                  title: 'Student Created',
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

        });

             })// finalize
      ).subscribe();


  }

  uploadNoImage( data: any ) {

    if ( data.photo != null ) {

      this.imageUrl = data.photo.url;
      this.imageName = data.photo.name;

    } else {

      // tslint:disable-next-line: max-line-length
      this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/gb-kendall-orders.appspot.com/o/students%2Fphoto%2Fno-image.png?alt=media&token=1fb55bd0-aac3-4805-8841-4969f41989b3';
      this.imageName = 'no-image.png';

    }

    const dataRef: AngularFirestoreCollection<any> = this.afs.collection( this.dbPath );
    const newData: StudentModel = {

                                     name: data.name.toLowerCase(),
                                     lastname: data.lastname.toLowerCase(),
                                     category: data.category,
                                     class: data.class,
                                     age: data.age,
                                     rank: data.rank,
                                     email: data.email,
                                     active: true,
                                     photo: {
                                       file: this.imageName,
                                       url: this.imageUrl
                                     }
                                 };

    if ( data.id != null ) {

       dataRef.doc( data.id ).update( newData );

       Swal.fire({
        position: 'top-end',
        imageUrl: "../../assets/img/icons/done.png",
        //instead of imageSize use imageWidth and imageHeight
        imageWidth: 100,
        imageHeight: 100,
        title: 'Student Updated',
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
        title: 'Student Created',
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

  // search
  searchStudent( term ) {

    return this.afs.collection(this.dbPath, ref => ref
    .where( 'active', '==', true )
    .orderBy('name')
    .startAt(term.toLowerCase())
    .endAt(term.toLowerCase() + '\uf8ff')
    .limit(500))
    .snapshotChanges().pipe(
      map(
        (res:any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()}))
      )
    );

  }

   /*==========================
        admin functions
   ============================*/

   // get students
   getDesablesStudent() {
    return this.afs.collection( this.dbPath, ref => ref
      .where( 'active', '==', false ) ).snapshotChanges().pipe(
        map(
          (res: any) => res.map( a => ({ id: a.payload.doc.id, ...a.payload.doc.data()}))
        )
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
