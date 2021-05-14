import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private _selectedTaskList: TaskList;
  private _taskLists: TaskList[];
  
  public get selectedTaskList() : TaskList {
    return this._selectedTaskList;
  }
  
  public set selectedTaskList(v : TaskList) {
    this._selectedTaskList = v;
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

  setTaskLists(taskLists: TaskList[]) {
    this.taskLists = taskLists;
  }
}
