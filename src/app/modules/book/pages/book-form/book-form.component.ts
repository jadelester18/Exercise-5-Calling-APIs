import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent {
  bookForm: FormGroup;

  titleArray: FormControl;
  descriptionArray: FormControl;
  authorArray: FormControl;
  commentsArray: FormArray;
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this.fb.group({
      title: [''],
      description: [''],
      author: [''],
      comments: this.fb.group(['']),
    });
    this.titleArray = this.bookForm.get('title') as FormControl;
    this.descriptionArray = this.bookForm.get('description') as FormControl;
    this.authorArray = this.bookForm.get('author') as FormControl;
    this.commentsArray = this.bookForm.get('comments') as FormArray;
  }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        // console.log(this.bookForm.value);
        this.bookService
          .updateBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Blog Updated Successfuly');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        // console.log(this.bookForm.value);
        this.bookService.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            alert('New Blog Added Successfuly');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
