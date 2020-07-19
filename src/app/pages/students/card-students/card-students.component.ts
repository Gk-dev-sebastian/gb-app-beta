import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { StudentModel } from 'src/app/models/student.model';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-card-students',
  templateUrl: './card-students.component.html',
  styles: []
})
export class CardStudentsComponent implements OnInit {

  student:StudentModel

  constructor( private studentService:StudentsService,
               private activateRoute:ActivatedRoute ) { }

  ngOnInit(): void {

    this.getStudent();
    
  }

  getStudent() {

    const id:string = this.activateRoute.snapshot.paramMap.get('id');

    this.studentService.getById( id ).subscribe(
      res => this.student = res
    );

  }

}
