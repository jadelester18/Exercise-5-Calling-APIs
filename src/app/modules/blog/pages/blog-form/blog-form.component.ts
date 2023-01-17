import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;

  titleArray: FormControl;
  descriptionArray: FormControl;
  authorArray: FormControl;
  commentsArray: FormArray;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private dialogRef: MatDialogRef<BlogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blogForm = this.fb.group({
      title: [''],
      description: [''],
      author: [''],
      comments: this.fb.group(['']),
    });
    this.titleArray = this.blogForm.get('title') as FormControl;
    this.descriptionArray = this.blogForm.get('description') as FormControl;
    this.authorArray = this.blogForm.get('author') as FormControl;
    this.commentsArray = this.blogForm.get('comments') as FormArray;
  }

  ngOnInit(): void {
    this.blogForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.blogForm.valid) {
      if (this.data) {
        // console.log(this.blogForm.value);
        this.blogService
          .updateBlog(this.data.id, this.blogForm.value)
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
        // console.log(this.blogForm.value);
        this.blogService.addBlog(this.blogForm.value).subscribe({
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
