import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../../../interfaces/blog/dialog-data.interface';
import {AuthService} from '../../../../shared/services/auth.service';
import {BlogService} from '../../../../shared/services/blog.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateArticle} from '../../../../interfaces/blog/create-article.interface';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA];
  tags: string[] = [];
  onSuccess$ = new Subject<void>();
  loader = false;

  articleForm: FormGroup  = this.formBuilder.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<BlogDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private authService: AuthService,
              private blogService: BlogService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  addArticle(){
    this.loader = true;
    const userId = String(this.authService.getUser('_id'));
    const tags = this.tags;
    const { title, text } = this.articleForm.getRawValue();
    const article: CreateArticle = { title, text, tags, userId };
    this.blogService.addArticle(article)
      .subscribe(() => {
        this.onSuccess$.next();
      });
    this.articleForm.reset();
    this.dialogRef.close(this.articleForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((item) => item !== tag)
  }
}
