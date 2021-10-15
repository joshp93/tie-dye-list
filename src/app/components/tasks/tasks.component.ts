import { Component, HostListener, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private _selectedTaskList: TaskList;
  private _taskLists: TaskList[];
  showSidebar: boolean;
  showMenu: boolean;

  constructor() { }

  ngOnInit(): void {
    this.setupForScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setupForScreenSize();
  }

  private setupForScreenSize() {
    if (window.innerWidth < 1000) {
      this.showSidebar = false;
      this.showMenu = true;
    } else {
      this.showSidebar = true;
      this.showMenu = false;
    }
  }

  public get selectedTaskList(): TaskList {
    return this._selectedTaskList;
  }

  public set selectedTaskList(v: TaskList) {
    this._selectedTaskList = v;
  }

  public get taskLists(): TaskList[] {
    return this._taskLists;
  }

  public set taskLists(v: TaskList[]) {
    this._taskLists = v;
  }

  setTaskLists(taskLists: TaskList[]) {
    this.taskLists = taskLists;
  }
}
