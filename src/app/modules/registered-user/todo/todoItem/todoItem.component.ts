import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../../../interfaces/todo/todo.interface';
import {TodoService} from '../../../../shared/services/todo.service';
import {removeTodo, toggleActivity} from '../../../../store/actions/todo.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../store/state/app.state';

@Component({
  selector: "todoItem-comp",
  templateUrl: "todoItem.component.html",
  styleUrls: ["./todoItem.component.scss"]
})

export class TodoItemComponent {
  @Input() item: Todo | undefined;
  @Output() onTodoUpdate = new EventEmitter<string>();

  constructor(public todoService: TodoService,
              private store: Store<IAppState>) {
  }

  toggle() {
    if (!this.item) {
      return;
    }
    // this.todoService.toggleActivity(this.item._id, !this.item.isDone)
    //   .subscribe((data) => {
    //     this.onTodoUpdate.emit(this.item?._id);
    //   });

    this.store.dispatch(toggleActivity({ id: this.item._id }));
  }

  delete() {
    if (!this.item) {
      return;
    }
    // this.todoService.removeTodo(this.item._id)
    //   .subscribe((data) => {
    //     this.onTodoUpdate.emit(this.item?._id);
    //   });
    this.store.dispatch(removeTodo({id: this.item._id}));
  }
}
