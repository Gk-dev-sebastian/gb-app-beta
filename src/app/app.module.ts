import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// pages
import { LoginComponent } from './pages/login/login.component';
import { ShareModule } from './pages/share/share.module';

import { StudentsModule } from './pages/students/students.module';
import { OrdersModule } from './pages/orders/orders.module';
import { ItemsModule } from './pages/items/items.module';
import { AdminModule } from './pages/admin/admin.module';
// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
// Swal
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// cdk
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EncrDecrService } from './services/encr-decr.service';
import { from } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //pages
    StudentsModule,
    OrdersModule,
    ItemsModule,
    AdminModule,
    ShareModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    // extra
    SweetAlert2Module,
    ScrollingModule
  ],
  providers: [
    EncrDecrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
