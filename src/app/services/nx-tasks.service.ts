import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';

@Injectable({
  providedIn: 'root'
})
export class NxTasksService {

  private rootUri: string = "http://localhost:8080/lists";

  constructor(private http: HttpClient) { }

  listTaskLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.rootUri);
  }
}
