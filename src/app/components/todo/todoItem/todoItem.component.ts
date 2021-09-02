import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../../interfaces/todo.interface';
import {TodoService} from '../../../shared/todo.service';

@Component({
  selector: "todoItem-comp",
  templateUrl: "todoItem.component.html",
  styleUrls: ["./todoItem.component.scss"]
})

export class TodoItemComponent {
  @Input() item: Todo | undefined;
  @Output() onTodoUpdate = new EventEmitter<number>();

  constructor(public todoService: TodoService) {
  }

  toggle() {
    if (!this.item) {
      return;
    }
    this.todoService.toggleActivity(this.item._id, !this.item.isDone)
      .subscribe((data) => {
        this.onTodoUpdate.emit(this.item?._id);
      });
  }

  delete() {
    if (!this.item) {
      return;
    }
    this.todoService.removeTodo(this.item._id)
      .subscribe((data) => {
        this.onTodoUpdate.emit(this.item?._id);
      });
  }
}
