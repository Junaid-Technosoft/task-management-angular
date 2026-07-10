import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/service/task-service.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService){}

  tasks$!: Observable<Task[]>;

  ngOnInit(): void {

      this.tasks$ = this.taskService.getTasks();

  }

  viewDetails(task:Task){
    this.taskService.showTaskItem(task);
  }

}
