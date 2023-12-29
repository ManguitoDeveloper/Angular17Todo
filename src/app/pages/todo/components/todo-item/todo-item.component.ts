import { Component, Input, OnInit, inject } from '@angular/core';
import { Todo } from '../../../../shared/models/todo';
import { ToDo } from '../../../../shared/services/todo.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroTrashMini,
  heroPencilSquareMini,
  heroCheckCircleMini,
} from '@ng-icons/heroicons/mini';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapitalizeFirstPipe } from '../../../../shared/pipes/capitalize-first.pipe';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, CapitalizeFirstPipe],
  viewProviders: [
    provideIcons({ heroTrashMini, heroPencilSquareMini, heroCheckCircleMini }),
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  ngOnInit(): void {
    this.todoTitle.setValue(this.todo.title);
  }
  todoTitle = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  private todoService: ToDo = inject(ToDo);
  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }
  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }
  editTodo(id: number) {
    const title = this.todoTitle.value.trim();
    const titleIsValid =
      this.todoTitle.valid &&
      title != '' &&
      this.todoTitle.value != this.todo.title;
    if (this.todo.editing && titleIsValid)
      this.todoService.updateTitle(id, title);
    this.todoService.editingTodo(id);
  }
}
