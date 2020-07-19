import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainStudentsComponent } from './main-students.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { NewStudentsComponent } from './new-students/new-students.component';
import { UpdateStudentsComponent } from './update-students/update-students.component';
import { ProfileStudentsComponent } from './profile-students/profile-students.component';
import { CardStudentsComponent } from './card-students/card-students.component';


const routes: Routes = [
 {
     path: '',
     component: MainStudentsComponent,
     children:  [
        { path: 'listStudent', component: ListStudentsComponent },
        { path: 'newStudent/:origin', component: NewStudentsComponent },
        { path: 'updateStudent/:id/:origin', component: UpdateStudentsComponent },
        { path: 'profileStudent/:id', component: ProfileStudentsComponent },
        { path: 'cardStudent/:id', component: CardStudentsComponent },
        { path: '', pathMatch: 'full', redirectTo: '/listStudent' }
     ]
 }
];

@NgModule({
  imports: [RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class RouterStudent { }
