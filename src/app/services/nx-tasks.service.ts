import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NxTasksService {

  private rootUri: string = environment.tasksServerBaseUrl + "/lists";

  constructor(private http: HttpClient, private authService: AuthService) { }

  listTaskLists(): Observable<TaskList[]> {
    return new Observable<TaskList[]>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        this.http.get<TaskList[]>(this.rootUri).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error listing the Task Lists. Please see console for more details.`);
          });
      });
    });
  }

  getTaskList(id: string): Observable<TaskList> {
    return new Observable<TaskList>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        this.http.get<TaskList>(`${this.rootUri}/${id}`).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error getting the Task List with id ${id}. Please see console for more details.`);
          });
      });
    });
  }

  listTasks(taskListId: string, showCompletedTasks: boolean): Observable<Task[]> {
    return new Observable<Task[]>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        const params = new HttpParams().append("showCompletedTasks", showCompletedTasks.toString());

        this.http.get<Task[]>(`${this.rootUri}/${taskListId}/tasks`, { params: params }).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error listing the Tasks. Please see console for more details.`);
          });
      });
    });
  }

  addList(title: string): Observable<TaskList> {
    return new Observable<TaskList>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        this.http.post<TaskList>(this.rootUri, {
          title: title
        } as TaskList).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error adding Task List ${title}. Please see console for more details.`);
          });
      });
    });
  }

  renameList(taskList: TaskList): Observable<TaskList> {
    return new Observable<TaskList>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        this.http.patch<TaskList>(`${this.rootUri}/${taskList.id}`, {
          title: taskList.title
        } as TaskList).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error renaming Task List ${taskList.title}. Please see console for more details.`);
          });
      });
    });
  }

  deleteList(id: string): Observable<boolean> {
    return new Observable<boolean>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        this.http.delete(`${this.rootUri}/${id}`).subscribe((response: boolean) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error deleting Task List with id ${id}. Please see console for more details.`);
          });
      });
    });
  }

  addTask(taskListId: string, task: Task, previousTaskId: string): Observable<Task> {
    return new Observable<Task>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        const params = new HttpParams()
        if (task.parent)
          params.set("parentTaskId", task.parent);
        if (previousTaskId)
          params.set("previousTaskId", previousTaskId);

        this.http.post<Task>(`${this.rootUri}/${taskListId}/tasks`,
          task, { params: params }).subscribe((response) => {
            result.next(response);
          },
            (error) => {
              console.error(error);
              result.error(`There was an error adding Task ${task.title} to Task List with id ${taskListId}. Please see console for more details.`);
            });
      });
    });
  }

  patchTask(taskListId: string, task: Task, previousTaskId: string): Observable<Task> {
    return new Observable<Task>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        const params = new HttpParams();
        if (task.parent)
          params.set("parentTaskId", task.parent);
        if (previousTaskId)
          params.set("previousTaskId", previousTaskId);

        this.http.patch<Task>(`${this.rootUri}/${taskListId}/tasks/${task.id}`,
          task, { params: params }).subscribe((response) => {
            result.next(response);
          },
            (error) => {
              console.error(error);
              result.error(`There was an error updating Task ${task.title} to Task List with id ${taskListId}. Please see console for more details.`);
            });
      });
    });
  }

  completeTask(taskListId: string, task: Task, previousTaskId: string): Observable<Task> {
    return new Observable<Task>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        const params = new HttpParams();
        if (task.parent)
          params.set("parentTaskId", task.parent);
        if (previousTaskId)
          params.set("previousTaskId", previousTaskId);
        
        this.http.post<Task>(`${this.rootUri}/${taskListId}/tasks/${task.id}/complete`,
          task, { params: params }).subscribe((response) => {
            result.next(response);
          },
            (error) => {
              console.error(error);
              result.error(`There was an error completing Task ${task.title} to Task List with id ${taskListId}. Please see console for more details.`);
            });
      });
    });
  }

  deleteTask(taskListId: string, id: string) {
    return new Observable<boolean>((result) => {
      this.authService.reviewAuthentication().subscribe(() => {
        this.http.delete(`${this.rootUri}/${taskListId}/tasks/${id}`).subscribe((response: boolean) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error deleting Task with id ${id} from Task List with id ${taskListId}. Please see console for more details.`);
          });
      });
    });
  }
}
