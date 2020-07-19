import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from '../../../services/students.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-students',
  templateUrl: './profile-students.component.html',
  styles: []
})
export class ProfileStudentsComponent implements OnInit {

  student:StudentModel;

  constructor( private studentService:StudentsService,
               private activeRoute:ActivatedRoute,
               private router:Router
                ) { }

  ngOnInit(): void {

    this.getById();
  }

  getById() {

    const id:string = this.activeRoute.snapshot.paramMap.get('id');
    
    this.studentService.getById( id ).subscribe(
      (res:StudentModel) => {
        this.student = res;
      }
    )
  }

  disable( id:string ) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This student will be disable!",
      imageUrl: "../../../../../assets/img/icons/warning.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: 'Yes, disable it!',
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

          this.studentService.deleteStudent( id ).then(

              result => {

                Swal.fire(
                  {
                    title:'Disabled!',
                    text: 'Estudent: ' + this.student.name + ' has been disabled.',
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
                
                this.router.navigateByUrl('/listStudent');  

              } // result
          ) // disable 

        } // if codition

    });
  }

}
