import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { EncrDecrService } from './encr-decr.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData : Observable<firebase.User>;
  public error:string = null;

  constructor( private afAuth:AngularFireAuth,
               private usersService:UsersService,
               private encrService:EncrDecrService,
               private router:Router ) {

    this.userData = afAuth.authState;

   }


  userValidation( user:string, pass:string ) {

    this.usersService.emailValidate( user ).subscribe( (user:any) => {

        if( user.length <= 0 ){

          console.log( 'user o pass incorrect ');
          localStorage.setItem( 'error', 'Email or Password is incorrect!');
          this.router.navigateByUrl('/login');
          return false;

        } else {

          let emailValid = user[0].email;
          let passDecrip = this.encrService.get('123456$#@$^@1ERF', user[0].pass );

          if( pass === passDecrip ){

            this.login( emailValid, passDecrip )
              .then( res => {

                if ( res != null ) {

                  this.userStorage( res.user.uid, res.user.refreshToken);
                  localStorage.setItem( 'user', user[0].user);

                  if ( localStorage.getItem( 'error' ) )
                  {
                    localStorage.removeItem( 'error' );
                  }
                  this.router.navigateByUrl('/listorder');

                } else {

                  localStorage.setItem( 'error', 'Error unexpected!');
                  this.router.navigateByUrl('/login');
                  return false;

                }

              })
              .catch( err => {
                //console.log( err );

                if( err.code === 'auth/user-not-found'){

                  this.createNew( emailValid, passDecrip )
                    .then( res => {

                    if ( res != null ) {
                      this.userStorage( res.user.uid, res.user.refreshToken);
                      localStorage.setItem( 'user', user[0].user);

                      if ( localStorage.getItem( 'error' ) )
                      {
                        localStorage.removeItem( 'error' );
                      }
                      this.router.navigateByUrl('/listorder');

                    } else {

                      localStorage.setItem( 'error', 'Email or Password is incorrect!');
                      this.router.navigateByUrl('/login');
                      return false;

                    }

                  })
                  .catch( err => {

                    console.log( err.message );
                    localStorage.setItem( 'error', 'Error create in auth DB!');
                    this.router.navigateByUrl('/login');
                    return false;

                  })

                } else {

                  localStorage.setItem( 'error', 'Error auth Login!');
                  this.router.navigateByUrl('/login');
                  return false;

                }

              });


          } else {

            localStorage.setItem( 'error', 'Email or Password is incorrect!');
            this.router.navigateByUrl('/login');
            return false;

          }

        }

    });

  }

  createNew( email:string, pass:string ) {
     return this.afAuth.createUserWithEmailAndPassword( email, pass );
  }

  login( email:string, pass:string ) {
    return this.afAuth.signInWithEmailAndPassword( email, pass );
  }

  isAuth() {
    return this.afAuth.authState.pipe( map( auth => auth));
  }

  logOut() {
    return this.afAuth.signOut();
  }

  userStorage( uid:string, token:string ) {
    localStorage.setItem( 'uid', uid );
    localStorage.setItem( 'token', token );
  }
}
