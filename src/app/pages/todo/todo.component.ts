import { matWavingHandRound } from '@ng-icons/material-icons/round';
import { Component, OnInit, inject } from '@angular/core';
import { ToDo } from '../../shared/services/todo.service';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TitleCasePipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoListComponent,
    TodoFilterComponent,
    TitleCasePipe,
    NgIconComponent,
  ],
  providers: [ToDo],
  viewProviders: [provideIcons({ matWavingHandRound })],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  public todoService: ToDo = inject(ToDo);
  ngOnInit(): void {
    let storage = localStorage.getItem('todos');
    if (storage) this.todoService.setTodos(JSON.parse(storage));
  }
  get todos() {
    return this.todoService.filteredToDos();
  }
}
