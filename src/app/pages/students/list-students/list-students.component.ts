import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../models/student.model';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styles: []
})
export class ListStudentsComponent implements OnInit {

  students:StudentModel [] = [];

  constructor( private studentsService:StudentsService ) { }

  ngOnInit(): void {

    this.getStudents()

  }

  getStudents() {

    this.studentsService.getStudent().subscribe(
      res => {

        //console.log( res );
        this.students = res;
        
      }
    )
  }

  search( term ) {

    this.studentsService.searchStudent( term ).subscribe(

      (res:any) => {

        if( res.length >= 0 ){
          this.students = res;
        } else {
          this.students = [];
          //console.log( 'no resultados ');
        }
      }
    )
  }

}
