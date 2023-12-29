import { heroPlusCircleMini } from '@ng-icons/heroicons/mini';
import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDo } from '../../../../shared/services/todo.service';

@Component({
  selector: 'todo-form',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  viewProviders: [provideIcons({ heroPlusCircleMini })],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  private todoService: ToDo = inject(ToDo);
  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  addNewTodo() {
    const value = this.newTodo.value.trim();
    const isValid = this.newTodo.valid && value != '';
    if (isValid) {
      this.todoService.addTodo(value);
    }
    this.newTodo.reset();
  }
}
