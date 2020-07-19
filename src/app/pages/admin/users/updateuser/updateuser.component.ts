import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

// model
import { UserModel } from 'src/app/models/user.model';
// service
import { ActivatedRoute } from '@angular/router';
// swal
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styles: []
})
export class UpdateuserComponent implements OnInit {

  user:UserModel = null
  id:string = '';

  userForm = new FormGroup({
    id: new FormControl( '', Validators.required ),
    user: new FormControl( '', Validators.required ),
    email: new FormControl('', Validators.required ),
    role: new FormControl(''),
    active: new FormControl( true )
  });
  error:string = '';

  constructor( private usersService:UsersService,
               private activeRoute:ActivatedRoute ) { }

  ngOnInit(): void {

    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.usersService.getById( id ).subscribe(
      (res:any) => {

        this.user = res;

        this.userForm = new FormGroup({
          id: new FormControl( this.user.id, Validators.required),
          user: new FormControl( this.user.user, Validators.required ),
          email: new FormControl(this.user.email, Validators.required ),
          role: new FormControl( this.user.role ),
          active: new FormControl( this.user.active )
        });

      }
    )
  }

  updateUser( data ){

    if( data.status !== 'INVALID' ) {

      this.usersService.updateUser( data.value );

      Swal.fire({
        position: 'top-end',
        imageUrl: "../../../../../assets/img/icons/done.png",
        //instead of imageSize use imageWidth and imageHeight
        imageWidth: 100,
        imageHeight: 100,
        title: 'User updated',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: 'swal-update-container-class',
          popup: 'swal-update-popup-class',
          title: 'swal-update-title-class'
        }
      });

      this.error = '';

    } else {

      this.error = 'You must complete all fields!'
      return;

     }

  }


}
