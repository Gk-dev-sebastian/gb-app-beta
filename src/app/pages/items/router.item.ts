import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes
import { ListItemsComponent } from './list-items/list-items.component';
import { NewItemsComponent } from './new-items/new-items.component';
import { UpdateItemsComponent } from './update-items/update-items.component';
import { ItemComponent } from './item/item.component';
import { MainItemsComponent } from './main-items.component';

import { ListAllComponent } from './list-all/list-all.component';
import { ListGiComponent } from './list-gi/list-gi.component';
import { ListApparelComponent } from './list-apparel/list-apparel.component';
import { ListTrainingComponent } from './list-training/list-training.component';
import { ListBeltsComponent } from './list-belts/list-belts.component';
import { ListAccessoriesComponent } from './list-accessories/list-accessories.component';
import { ListOrderedComponent } from './list-ordered/list-ordered.component';


const routes: Routes = [
 {
     path: '',
     component: MainItemsComponent,
     children:  [
        {
          path: 'listitem',
          component: ListItemsComponent,
          children: [
            { path: 'allItems', component: ListAllComponent },
            { path: 'giItems', component: ListGiComponent },
            { path: 'trainingItems', component: ListTrainingComponent },
            { path: 'apparelItems', component: ListApparelComponent },
            { path: 'beltsItems', component: ListBeltsComponent },
            { path: 'accessoriesItems', component: ListAccessoriesComponent },
            { path: 'ordered', component: ListOrderedComponent },
            { path: '', pathMatch: 'full', redirectTo: 'allItems' }
          ]
        },
        { path: 'newitem/:origin', component: NewItemsComponent },
        { path: 'updateitem/:id/:origin', component: UpdateItemsComponent },
        { path: 'item/:id/:origin', component: ItemComponent },
        { path: '', pathMatch: 'full', redirectTo: '/listitem' }
     ]
 }
];

@NgModule({
  imports: [RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class RouterItem { }
