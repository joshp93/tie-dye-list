import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private _selectedTaskListId: string;
  private _taskLists: TaskList[];
  
  public get selectedTaskListId() : string {
    return this._selectedTaskListId;
  }
  
  public set selectedTaskListId(v : string) {
    this._selectedTaskListId = v;
  }
  
  public get taskLists() : TaskList[] {
    return this._taskLists;
  }
  
  public set taskLists(v : TaskList[]) {
    this._taskLists = v;
  }

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedTaskListId(id: string) {
    this.selectedTaskListId = id;
  }

  setTaskLists(taskLists: TaskList[]) {
    this.taskLists = taskLists;
  }
}
