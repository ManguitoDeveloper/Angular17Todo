import { Component, Input } from '@angular/core';
import { Todo } from '../../../../shared/models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgOptimizedImage],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todos!: Todo[];
}
