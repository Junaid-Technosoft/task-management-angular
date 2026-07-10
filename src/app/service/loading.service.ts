import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, distinctUntilChanged } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // private loadingCount = 0;

  // private loadingSubject = new BehaviorSubject<boolean>(false);

  // loading$: Observable<boolean> = this.loadingSubject.asObservable();


  // startLoading() {
  //   this.loadingCount++;
  //    console.log('START loading count:', this.loadingCount);
  //   this.loadingSubject.next(true);
  // }


  // stopLoading() {

  //   this.loadingCount--;
  //   console.log('STOP loading count:', this.loadingCount);
  //   if (this.loadingCount <= 0) {
  //     this.loadingCount = 0;
  //     this.loadingSubject.next(false);
  //   }

  // }

  private loadingMap = new BehaviorSubject<Record<string, boolean>>({});

  loading$ = this.loadingMap.asObservable();

  start(key: string) {
    const current = this.loadingMap.value;

    this.loadingMap.next({
      ...current,
      [key]: true
    });
  }

  stop(key: string) {
    const current = this.loadingMap.value;

    this.loadingMap.next({
      ...current,
      [key]: false
    });
  }

  isLoading(key: string): Observable<boolean> {
    return this.loading$.pipe(
      map(state => !!state[key]),
      distinctUntilChanged()
    );
  }

   execute<T>(key: string, operation$: Observable<T>): Observable<T> {
    this.start(key);

    return operation$.pipe(
      finalize(() => this.stop(key))
    );
  }
}