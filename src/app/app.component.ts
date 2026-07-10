import { Component } from '@angular/core';
import { TaskService } from './service/task-service.service';
import { TaskFilter } from './model/TaskFilter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'task-management';
  showTaskForm = false;

  constructor(public taskService: TaskService) {
  }


  openTaskForm(): void {
    this.showTaskForm = true;
  }
  
  onFiltersChanged(filters: TaskFilter): void {
    this.taskService.updateFilters(filters);
  }
  
}
