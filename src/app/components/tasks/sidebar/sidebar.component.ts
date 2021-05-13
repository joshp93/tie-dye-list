import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'tasks-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() taskListSelected = new EventEmitter<string>();
  @Output() taskListsEvent = new EventEmitter<TaskList[]>();
  taskListValue: string;

  taskLists: TaskList[]

  constructor(private nxTasksService: NxTasksService) { }

  ngOnInit(): void {
    this.listTaskLists();
  }

  listTaskLists() {
    this.nxTasksService.listTaskLists().subscribe((result) => {
      this.taskLists = result;
      this.emitTasksList();
    },
      (error) => alert(error));
  }

  selectTaskList(id: string) {
    this.taskListSelected.emit(id);
  }

  addList() {
    this.nxTasksService.addList(this.taskListValue).subscribe((result) => {
      if (result) {
        this.taskLists.push(result);
        this.emitTasksList();
        this.taskListValue = ""
      }
    },
    (error) => alert(error));
  }

  private emitTasksList() {
    this.taskListsEvent.emit(this.taskLists);
  }
}
