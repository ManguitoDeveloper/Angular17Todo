import { ToDo } from './../../../../shared/services/todo.service';
import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroDocumentDuplicateMini,
  heroDocumentTextMini,
  heroDocumentCheckMini,
} from '@ng-icons/heroicons/mini';
import { FilterType } from '../../../../shared/models/todo';

@Component({
  selector: 'todo-filter',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({
      heroDocumentCheckMini,
      heroDocumentDuplicateMini,
      heroDocumentTextMini,
    }),
  ],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss',
})
export class TodoFilterComponent {
  private todoService: ToDo = inject(ToDo);
  todoFilterSignalRef = this.todoService.filter;
  filterTodos(filterString: FilterType) {
    this.todoService.changeFilter(filterString);
  }
}
