import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '../../../services/students.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-students',
  templateUrl: './new-students.component.html',
  styles: []
})
export class NewStudentsComponent implements OnInit {

  selectionFile: any = null;
  imgTemp: any;
  origin:string = this.activeRoute.snapshot.paramMap.get( 'origin' );

  kRank = [
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
  ];

  aRank = [
    {belt: 'white-belt'},
    {belt: 'blue-belt'},
    {belt: 'purple-belt'},
    {belt: 'brown-belt'},
    {belt: 'black-belt'},
  ];

  kCategories = [
    {name: 'Tiny Champions', age: '(3-5)'},
    {name: 'Little Champions 1', age: '(6-7)'},
    {name: 'Little Champions 2', age: '(8-10)'},
    {name: 'Juniors', age: '(11-13)'},
    {name: 'Teens', age: '(14-17)'},
  ];

  aCategories = [
    {name: 'Fundamentals [GB1]', age: '(18)'},
    {name: 'Advanced [GB2]', age: '(19)'},
    {name: 'Advanced [GB3]', age: '(20)'},
  ];

  aClasses = [
    {name: '3 PM'},
    {name: '7 PM'},
    {name: '8 PM'},
  ];

  kClasses = [
    {name: '5 PM'},
    {name: '6 PM'},
  ];

  studentForm = new FormGroup({

    name: new FormControl('', Validators.required),
    lastname: new FormControl ('', Validators.required),
    class: new FormControl(''),
    age: new FormControl (''),
    rank: new FormControl(''),
    category: new FormControl(''),
    email: new FormControl('', Validators.email),

  });

  constructor( private studentService:StudentsService,
               private router:Router,
               public activeRoute:ActivatedRoute  ) { }

  ngOnInit(): void {


  }

  addNew( form ) {

    if( form.status !== 'VALID' ){

      Swal.fire({
        position: 'top-end',
        imageUrl: "../../../../../assets/img/icons/warning.png",
        //instead of imageSize use imageWidth and imageHeight
        imageWidth: 100,
        imageHeight: 100,
        title: 'You must complete all fields',
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

      const data = form.value;

      this.studentService.createNew( data, this.selectionFile );

      if( this.origin === '../../neworder'){
        this.origin = '/neworder';
      }

      if( this.origin === '../../listStudent'){
        this.origin = '/listStudent';
      }

      this.router.navigateByUrl( this.origin );
  }

  handlerImage( file: any ) {

    this.selectionFile = file;

    if ( file != null ) {

       // temp image
        const reader = new FileReader();
        const urlImageTemp = reader.readAsDataURL( file );
        reader.onloadend = () => this.imgTemp = reader.result;

    }

    // console.log( this.selectionFile );
  }

}
