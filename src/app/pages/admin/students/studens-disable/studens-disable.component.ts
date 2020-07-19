import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-studens-disable',
  templateUrl: './studens-disable.component.html',
  styles: []
})
export class StudensDisableComponent implements OnInit {

  students:StudentModel[] = [];

  constructor( private studentsService: StudentsService ) { }

  ngOnInit(): void {

    this.studentsService.getDesablesStudent().subscribe(
      students => this.students = students
    );

  }

  reactive( id:string ) {

    this.studentsService.reActive( id );

    Swal.fire({
      position: 'top-end',
      imageUrl: "../../../../../assets/img/icons/done.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Student Reactive',
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

  delete( id:string ) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This Student will be deleted!",
      imageUrl: "../../../../../assets/img/icons/warning.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      customClass: {
        container: 'container-class',
        popup: 'popup-class',
        title: 'title-class',
        content: 'content-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      }
    }).then( (result) => {

        if( result.value ) {

          this.studentsService.delete( id ).then( result => {

                Swal.fire(
                  {
                    title:'Deleted!',
                    text: 'This Student has been deleted.',
                    imageUrl: "../../../../../assets/img/icons/done.png",
                    //instead of imageSize use imageWidth and imageHeight
                    imageWidth: 100,
                    imageHeight: 100,
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                      container: 'container-class',
                      popup: 'popup-class',
                      title: 'title-class',
                      content: 'content-class',
                      closeButton: 'close-button-class',
                    }
                  }
                );

          });

        }

    });
  }

}
