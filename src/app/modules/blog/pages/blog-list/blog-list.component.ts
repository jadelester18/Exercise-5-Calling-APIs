import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BlogService } from '../../services/blog.service';
import { BlogFormComponent } from '../blog-form/blog-form.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'author',
    'comments',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  static getBlogList: any;

  constructor(private dialog: MatDialog, private blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddBlogForm() {
    // this.dialog.open(BlogFormComponent);
    const dialogRef = this.dialog.open(BlogFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBlogList();
        }
      },
    });
  }

  getBlogList() {
    this.blogService.getBlogList().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteBlogItem(id: number) {
    this.blogService.deleteBlog(id).subscribe({
      next: (data) => {
        alert('Blog Deleted');
        this.getBlogList();
      },
      error: console.log,
    });
  }

  openEditBlogForm(data: any) {
    // this.dialog.open(BlogFormComponent);
    const dialogRef = this.dialog.open(BlogFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBlogList();
        }
      },
    });
  }
}
