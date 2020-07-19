import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// extra modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// pages
import { MainItemsComponent } from './main-items.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { NewItemsComponent } from './new-items/new-items.component';
import { UpdateItemsComponent } from './update-items/update-items.component';
import { ItemComponent } from './item/item.component';
import { ShareModule } from '../share/share.module';
import { ListGiComponent } from './list-gi/list-gi.component';
import { ListTrainingComponent } from './list-training/list-training.component';
import { ListBeltsComponent } from './list-belts/list-belts.component';
import { ListApparelComponent } from './list-apparel/list-apparel.component';
import { ListAccessoriesComponent } from './list-accessories/list-accessories.component';
import { ListAllComponent } from './list-all/list-all.component';
import { TableListComponent } from './share/table-list/table-list.component';
import { SearchComponent } from './share/search/search.component';
import { ListMenuComponent } from './share/list-menu/list-menu.component';


// routes
import { RouterItem } from './router.item';
import { ListOrderedComponent } from './list-ordered/list-ordered.component';


@NgModule({
  declarations: [
    MainItemsComponent,
    ListItemsComponent,
    NewItemsComponent,
    UpdateItemsComponent,
    ItemComponent,
    ListGiComponent,
    ListTrainingComponent,
    ListBeltsComponent,
    ListApparelComponent,
    ListAccessoriesComponent,
    ListAllComponent,
    TableListComponent,
    SearchComponent,
    ListMenuComponent,
    ListOrderedComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    RouterItem,
    ScrollingModule
  ],
  exports: [
    MainItemsComponent,
    ListItemsComponent,
    NewItemsComponent,
    UpdateItemsComponent,
    ItemComponent
  ]
})
export class ItemsModule { }
