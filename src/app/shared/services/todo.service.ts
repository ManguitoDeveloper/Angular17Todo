import { Injectable, signal, effect, computed } from '@angular/core';
import { FilterType, Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class ToDo {
  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.#todo()));
    });
  }

  #todo = signal<Todo[]>([]);

  setTodos(todos: Todo[]) {
    this.#todo.set(todos);
  }

  addTodo(title: string) {
    this.#todo.update((current) => {
      return [
        ...current,
        {
          id: this.#todo().length + 1,
          title: title,
          completed: false,
        },
      ];
    });
  }

  removeTodo(id: number) {
    this.#todo.update((current) => current.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: number) {
    this.#todo.update((current) =>
      current.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  }

  editingTodo(id: number) {
    this.#todo.update((current) =>
      current.map((todo) => {
        return todo.id === id && !todo.editing
          ? { ...todo, editing: true }
          : { ...todo, editing: false };
      })
    );
  }

  updateTitle(id: number, title: string) {
    this.#todo.update((current) =>
      current.map((todo) => {
        return todo.id === id ? { ...todo, title: title } : todo;
      })
    );
  }

  filter = signal<FilterType>('all');

  filteredToDos = computed(() => {
    const filter = this.filter();
    const todos = this.#todo();
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  });

  changeFilter(filter: FilterType): void {
    this.filter.set(filter);
  }
}
