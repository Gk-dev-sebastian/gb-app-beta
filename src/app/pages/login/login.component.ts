import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  error:string = null;

  loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl ('')
  });


  constructor( private authService:AuthService,
               private router:Router ) {}

  ngOnInit(): void {}

  login( form ) {

    const user = form.value.email;
    const pass = form.value.pass;

    this.authService.userValidation( user, pass );

    if( localStorage.getItem('error') ){
      this.error = localStorage.getItem('error');
    }

  }

}
