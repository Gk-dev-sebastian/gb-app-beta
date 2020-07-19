import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MainStudentsComponent } from './main-students.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { NewStudentsComponent } from './new-students/new-students.component';
import { UpdateStudentsComponent } from './update-students/update-students.component';
import { ProfileStudentsComponent } from './profile-students/profile-students.component';
import { CardStudentsComponent } from './card-students/card-students.component';
import { RouterStudent } from './router.student';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    MainStudentsComponent,
    ListStudentsComponent,
    NewStudentsComponent,
    UpdateStudentsComponent,
    ProfileStudentsComponent,
    CardStudentsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    RouterStudent,
    ScrollingModule
  ],
  exports: [
    MainStudentsComponent,
    ListStudentsComponent,
    NewStudentsComponent,
    UpdateStudentsComponent,
    ProfileStudentsComponent,
    CardStudentsComponent
  ],
})
export class StudentsModule { }
