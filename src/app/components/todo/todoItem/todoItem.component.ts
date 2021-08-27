import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TodoComponent} from '../todo.component';

@Component({
  selector: "todoItem-comp",
  templateUrl: "todoItem.component.html",
  styleUrls: ["./todoItem.component.scss"]
})

export class TodoItemComponent {
  @Input() item: any | undefined;
  @Output() onToggleActivity = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();
  date: number = Date.now();

  toggle() {
    console.log(this.item, this.item.date);
    this.onToggleActivity.emit(this.item.id)
  }

  delete() {
    this.removeItem.emit(this.item.id)
    }
}
