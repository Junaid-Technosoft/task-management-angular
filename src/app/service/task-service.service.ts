import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, from } from 'rxjs';
import { Task } from '../model/task';
import { LoadingService } from './loading.service';
import { BehaviorSubject } from 'rxjs';
import { TaskFilter } from '../model/TaskFilter';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly collectionName = 'tasks';

  showTask: boolean = false;

  selectedTask! : Task ;

  // stores complete firestore tasks
  private allTasksSubject = new BehaviorSubject<Task[]>([]);


  // exposes filtered tasks to app
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  tasks$ = this.tasksSubject.asObservable();

  private currentFilter: TaskFilter = {
    priority: 'ALL',
    status: 'ALL'
  };


  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {
    this.loadTasks();
  }

  private loadTasks(): void {

    this.firestore
      .collection<Task>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {

            const data = action.payload.doc.data();

            const id = action.payload.doc.id;

            return {
              id,
              ...data
            };

          })
        )
      )
      .subscribe(tasks => {

        this.allTasksSubject.next(tasks);

        this.applyFilters();

      });

  }

  updateFilters(filters: TaskFilter): void {

    this.currentFilter = filters;

    this.applyFilters();

  }

  private applyFilters(): void {

    const tasks = this.allTasksSubject.value;


    const filtered = tasks.filter(task => {


      const priorityMatch =
        this.currentFilter.priority === 'ALL' ||
        task.priority === this.currentFilter.priority;



      const statusMatch =
        this.currentFilter.status === 'ALL' ||
        task.status === this.currentFilter.status;



      return priorityMatch && statusMatch;

    });


    this.tasksSubject.next(filtered);

  }


  // Get all tasks
  getTasks(): Observable<Task[]> {

   return this.tasks$;

  }


  // Create a task
  addTask(task: Task): Observable<any> {

    const { id, ...taskData } = task;

    return this.loadingService.execute(
      'add-task',

      from(
        this.firestore
          .collection<Task>(this.collectionName)
          .add(taskData)
      )

    );

  }


  // Update a task
  updateTask(id: string, task: Partial<Task>): Observable<void> {

    return this.loadingService.execute(
      "update-task",

      from(
        this.firestore
          .collection<Task>(this.collectionName)
          .doc(id)
          .update(task)
      )

    );

  }


  // Delete a task
  deleteTask(id: string): Observable<void> {

    return this.loadingService.execute(
      'delete-task',

      from(
        this.firestore
          .collection<Task>(this.collectionName)
          .doc(id)
          .delete()
      )

    );

  }


  showTaskItem(task:Task):void{
    this.showTask = true;
    this.selectedTask = task;
  }

  closeTaskItem():void{
    this.showTask = false;
    
  }

}