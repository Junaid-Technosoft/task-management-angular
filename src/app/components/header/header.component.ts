
import { Component, EventEmitter, Output } from '@angular/core';
import { TaskFilter } from 'src/app/model/TaskFilter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  @Output() addTask = new EventEmitter<void>();

  @Output() filtersChanged = new EventEmitter<TaskFilter>();


  selectedPriority: TaskFilter['priority'] = 'ALL';

  selectedStatus: TaskFilter['status'] = 'ALL';



  onAddTask(): void {

    this.addTask.emit();

  }



  onFilterChange(): void {

    this.filtersChanged.emit({

      priority: this.selectedPriority,

      status: this.selectedStatus

    });

  }

}