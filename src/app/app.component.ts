import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogFormComponent } from './modules/blog/pages/blog-form/blog-form.component';
import { BlogListComponent } from './modules/blog/pages/blog-list/blog-list.component';
import { BlogService } from './modules/blog/services/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'exercise-5';
}
