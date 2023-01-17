import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlogService } from 'src/app/modules/blog/services/blog.service';
import { BookService } from '../../services/book.service';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'authors', 'isbn', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  static getBookList: any;

  constructor(private dialog: MatDialog, private bookService: BookService) {}

  ngOnInit(): void {
    this.getBookList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddBookForm() {
    // this.dialog.open(BookFormComponent);
    const dialogRef = this.dialog.open(BookFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBookList();
        }
      },
    });
  }

  getBookList() {
    this.bookService.getBookList().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteBookItem(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: (data) => {
        alert('Book Deleted');
        this.getBookList();
      },
      error: console.log,
    });
  }

  openEditBookForm(data: any) {
    // this.dialog.open(BlogFormComponent);
    const dialogRef = this.dialog.open(BookFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBookList();
        }
      },
    });
  }
}
