import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// service
import { UsersService } from 'src/app/services/users.service';
// model
import { UserModel } from 'src/app/models/user.model';
// crypto
import { EncrDecrService } from 'src/app/services/encr-decr.service';
// swal
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styles: []
})
export class NewuserComponent implements OnInit {

  userForm = new FormGroup({

    user: new FormControl( '', Validators.required ),
    email: new FormControl('', Validators.required ),
    pass: new FormControl('', Validators.required )

  });

  error:string = '';

  constructor(  private usersService:UsersService,
                private encrypt:EncrDecrService,
                private router:Router  ) { }

  ngOnInit(): void {}

  newUser( data ) {

  if( data.status !== 'INVALID' ) {

    let email:string = data.value.email;
    let encryptedPass = this.encrypt.set('123456$#@$^@1ERF', data.value.pass );

    this.usersService.emailValidate( email ).subscribe( (res:any) => {

      if( res.length <= 0 ){

        this.error = null;

        const user:UserModel = {
          user: data.value.user,
          email: email,
          pass: encryptedPass,
          role: 'U',
          active:true
        }

        this.usersService.newUser( user );

        Swal.fire({
          position: 'top-end',
          imageUrl: "../../../../../assets/img/icons/done.png",
          //instead of imageSize use imageWidth and imageHeight
          imageWidth: 100,
          imageHeight: 100,
          title: 'New user created',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'swal-update-container-class',
            popup: 'swal-update-popup-class',
            title: 'swal-update-title-class'
          }
        });

        this.router.navigateByUrl('/users')

      } else {

        this.error = 'this Email already exists!';

      }
    })

    //this.usersService.newUser(  )

   } else {

    this.error = 'You must complete all fields!'
    return;

   }

  }

}
