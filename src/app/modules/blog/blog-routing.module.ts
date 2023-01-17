import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogFormComponent } from './pages/blog-form/blog-form.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';

const routes: Routes = [
  {
    //this is for default redirect page
    path: '',
    component: BlogListComponent,
  },
  {
    path: 'form',
    component: BlogFormComponent,
  },
  {
    path: 'list',
    component: BlogListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
