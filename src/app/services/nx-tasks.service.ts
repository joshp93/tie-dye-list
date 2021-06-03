import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class NxTasksService {

  private rootUri: string = "http://localhost:8080/lists";

  constructor(private http: HttpClient) { }

  listTaskLists(): Observable<TaskList[]> {
    return new Observable<TaskList[]>((result) => {

      this.http.get<TaskList[]>(this.rootUri).subscribe((response) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error listing the Task Lists. Please see console for more details.`);
        });

    });
  }

  getTaskList(id: string): Observable<TaskList> {
    return new Observable<TaskList>((result) => {

      this.http.get<TaskList>(`${this.rootUri}/${id}`).subscribe((response) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error getting the Task List with id ${id}. Please see console for more details.`);
        });

    });
  }

  listTasks(taskListId: string): Observable<Task[]> {
    return new Observable<Task[]>((result) => {

      this.http.get<Task[]>(`${this.rootUri}/${taskListId}/tasks`).subscribe((response) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error listing the Tasks. Please see console for more details.`);
        });

    });
  }

  addList(title: string): Observable<TaskList> {
    return new Observable<TaskList>((result) => {

      this.http.post<TaskList>(this.rootUri, <TaskList>{
        title: title
      }).subscribe((response) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error adding Task List ${title}. Please see console for more details.`);
        });

    });
  }

  renameList(taskList: TaskList): Observable<TaskList> {
    return new Observable<TaskList>((result) => {

      this.http.patch<TaskList>(`${this.rootUri}/${taskList.id}`, <TaskList>{
        title: taskList.title
      }).subscribe((response) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error renaming Task List ${taskList.title}. Please see console for more details.`);
        });

    });
  }

  deleteList(id: string): Observable<boolean> {
    return new Observable<boolean>((result) => {

      this.http.delete(`${this.rootUri}/${id}`).subscribe((response: boolean) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error deleting Task List with id ${id}. Please see console for more details.`);
        });

    });
  }

  addTask(taskListId: string, task: Task, previousTaskId: string): Observable<Task> {
    return new Observable<Task>((result) => {

      const params = new HttpParams()
      if (task.parent)
        params.set("parentTaskId", task.parent);
      if (previousTaskId)
        params.set("previousTaskId", previousTaskId);

      this.http.post<Task>(`${this.rootUri}/${taskListId}/tasks`,
        <Task>{
          title: task.title,
          notes: task.notes
        }, { params: params }).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error adding Task ${task.title} to Task List with id ${taskListId}. Please see console for more details.`);
          });

    });
  }

  patchTask(taskListId: string, task: Task, previousTaskId: string): Observable<Task> {
    return new Observable<Task>((result) => {

      const params = new HttpParams();
      if (task.parent)
        params.set("parentTaskId", task.parent);
      if (previousTaskId)
        params.set("previousTaskId", previousTaskId);

      this.http.patch<Task>(`${this.rootUri}/${taskListId}/tasks/${task.id}`,
        <Task>{
          title: task.title,
          notes: task.notes
        }).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error updating Task ${task.title} to Task List with id ${taskListId}. Please see console for more details.`);
          });

    });
  }

  completeTask(taskListId: string, task: Task, previousTaskId: string): Observable<Task> {
    return new Observable<Task>((result) => {

      const params = new HttpParams();
      if (task.parent)
        params.set("parentTaskId", task.parent);
      if (previousTaskId)
        params.set("previousTaskId", previousTaskId);

      this.http.post<Task>(`${this.rootUri}/${taskListId}/tasks/${task.id}/complete`,
        <Task>{
          title: task.title,
          notes: task.notes
        }).subscribe((response) => {
          result.next(response);
        },
          (error) => {
            console.error(error);
            result.error(`There was an error completing Task ${task.title} to Task List with id ${taskListId}. Please see console for more details.`);
          });

    });
  }

  deleteTask(taskListId: string, id: string) {
    return new Observable<boolean>((result) => {

      this.http.delete(`${this.rootUri}/${taskListId}/tasks/${id}`).subscribe((response: boolean) => {
        result.next(response);
      },
        (error) => {
          console.error(error);
          result.error(`There was an error deleting Task with id ${id} from Task List with id ${taskListId}. Please see console for more details.`);
        });

    });
  }
}
