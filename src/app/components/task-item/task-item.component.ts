import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task-service.service';
import { Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  

  @Input() selectedTask!: Task;
  taskForm!: FormGroup;

  updateLoading$ = this.loading.isLoading('update-task');

  deleteLoading$ = this.loading.isLoading('delete-task');

  constructor(private fb: FormBuilder,
    public taskService: TaskService,
    public loading: LoadingService
  ) {}

  ngOnInit(): void {

     this.taskForm = this.fb.group({
        title: [
          this.selectedTask.title,
          [Validators.required, Validators.maxLength(20)]
        ],
        description: [
          this.selectedTask.description,
          [Validators.required]
        ],
        status: [
          this.selectedTask.status,
          [Validators.required]
        ],
        priority: [
          this.selectedTask.priority,
          [Validators.required]
        ]
      });

  }

  updateTask() {

    if (this.taskForm.invalid || !this.selectedTask.id) return;

    const updatedTask: Task = {
      ...this.selectedTask,
      ...this.taskForm.value
    };

    this.taskService
      .updateTask(this.selectedTask.id, updatedTask)
      .subscribe({
        next: () => {
          this.closeModal()
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });

  }

  closeModal(){
    this.taskService.closeTaskItem();
  }


  deleteTask(id:string){
    this.taskService.deleteTask(id)
    .subscribe({
      next:()=>{
        this.closeModal();
      }
    })
  }
}
