import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../../../../interfaces/blog/article.interface';
import {BlogService} from '../../../../shared/services/blog.service';

@Component({
  selector: 'blog-item-comp',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
  @Input() article: Article | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
