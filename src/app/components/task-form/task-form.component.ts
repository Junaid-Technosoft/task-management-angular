import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task-service.service';
import { Task } from 'src/app/model/task';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  @Output() close = new EventEmitter<void>();

  addLoading$ = this.loading.isLoading('add-task');

  

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private loading: LoadingService
  ) {}

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required]
  });

  submit() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task: Task = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description!,
      completed: false,
      status: this.taskForm.value.status as Task['status'],
      priority: this.taskForm.value.priority as Task['priority'],
      createdAt: new Date()
    };


    this.taskService.addTask(task)
    .subscribe({

      next: () => {

        this.taskForm.reset({
          title: '',
          description: '',
          status: 'PENDING',
          priority: 'MEDIUM'
        });

        this.close.emit();

      },

      error: (error) => {

        console.error("Failed to add task:", error);

      }

    });
  }

  closeModal() {
    this.close.emit();
  }

}
