import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookFormComponent } from './pages/book-form/book-form.component';

const routes: Routes = [
  {
    //this is for default redirect page
    path: '',
    component: BookListComponent,
  },
  {
    path: 'form',
    component: BookFormComponent,
  },
  {
    path: 'list',
    component: BookListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class BookRoutingModule {}
