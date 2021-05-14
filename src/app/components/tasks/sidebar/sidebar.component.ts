import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'tasks-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() taskListSelectedEvent = new EventEmitter<TaskList>();
  taskListValue: string;
  taskLists: TaskList[]

  constructor(private nxTasksService: NxTasksService) { }

  ngOnInit(): void {
    this.listTaskLists(true);
  }

  listTaskLists(select?: boolean) {
    this.nxTasksService.listTaskLists().subscribe((result) => {
      this.taskLists = result;
      if (select)
        this.selectTaskList(this.taskLists[0]);
    },
      (error) => alert(error));
  }

  selectTaskList(taskList: TaskList) {
    this.taskListSelectedEvent.emit(taskList);
  }

  addList() {
    this.nxTasksService.addList(this.taskListValue).subscribe((result) => {
      if (result) {
        this.taskLists.push(result);
        this.taskListValue = "";
      }
    },
    (error) => alert(error));
  }
}
