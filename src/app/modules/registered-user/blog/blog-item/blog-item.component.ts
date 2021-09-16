import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../../interfaces/blog/article.interface';

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
