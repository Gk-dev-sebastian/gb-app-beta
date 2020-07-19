import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-update-students',
  templateUrl: './update-students.component.html',
  styles: []
})
export class UpdateStudentsComponent implements OnInit {

  student:StudentModel;
  selectionFile: any = null;
  imgTemp: any;
  origin:string = this.activateRoute.snapshot.paramMap.get( 'origin' );



  // ------------------
  rank = [
    {belt: 'white-belt'},
    {belt: 'grey/white-belt'},
    {belt: 'grey-belt'},
    {belt: 'grey/black-belt'},
    {belt: 'yellow/white-belt'},
    {belt: 'yellow-belt'},
    {belt: 'yellow/black-belt'},
    {belt: 'orange/white-belt'},
    {belt: 'orange-belt'},
    {belt: 'orange/black-belt'},
    {belt: 'green/white-belt'},
    {belt: 'green-belt'},
    {belt: 'green/black-belt'},
    {belt: 'blue-belt'},
    {belt: 'purple-belt'},
    {belt: 'brown-belt'},
    {belt: 'black-belt'},
  ];

  categories = [
    {name: 'Tiny Champions', age: '(3-5)'},
    {name: 'Little Champions 1', age: '(6-7)'},
    {name: 'Little Champions 2', age: '(8-10)'},
    {name: 'Juniors', age: '(11-13)'},
    {name: 'Teens', age: '(14-17)'},
    {name: 'Fundamentals [GB1]', age: '(18)'},
    {name: 'Advanced [GB2]', age: '(19)'},
    {name: 'Advanced [GB3]', age: '(20)'},
  ];

  classes = [
    {name: '3 PM'},
    {name: '5 PM'},
    {name: '6 PM'},
    {name: '7 PM'},
    {name: '8 PM'},
  ];

  studentForm = new FormGroup({

    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastname: new FormControl ('', Validators.required),
    class: new FormControl(''),
    age: new FormControl (''),
    rank: new FormControl(''),
    category: new FormControl(''),
    email: new FormControl('', Validators.email),


  });

  constructor( private activateRoute:ActivatedRoute,
               private studentService:StudentsService,
               private router:Router ) { }

  ngOnInit(): void {

    const id:string = this.activateRoute.snapshot.paramMap.get( 'id' );

    this.studentService.getById(id).subscribe(
      (res:StudentModel ) => {

        this.studentForm = new FormGroup({

          id: new FormControl(res.id),
          name: new FormControl(res.name, Validators.required),
          lastname: new FormControl (res.lastname, Validators.required),
          age: new FormControl (res.age),
          email: new FormControl(res.email, Validators.email),
          class: new FormControl(res.class),
          rank: new FormControl(res.rank),
          category: new FormControl(res.category),

        });

        this.student = res;

      }
    );


  }

  update( form ) {

    if ( this.selectionFile != null ) {

      const data = form.value;

      this.studentService.updateStudent( data, this.selectionFile );
      //console.log( data );

    } else {

      const image = null;
      const data = form.value;
      const newData = {
        ...data,
        photo: {
          name: this.student.photo.file,
          url: this.student.photo.url
        }
      }

      this.studentService.updateStudent( newData, image );
      //console.log( newData );
    }

    this.router.navigateByUrl( `/profileStudent/${this.student.id}`);

  }

  handlerImage( file: any ) {

  this.selectionFile = file;

  if ( file != null ) {

     // temp image
      const reader = new FileReader();
      const urlImageTemp = reader.readAsDataURL( file );
      reader.onloadend = () => this.imgTemp = reader.result;

  }

  }

}
