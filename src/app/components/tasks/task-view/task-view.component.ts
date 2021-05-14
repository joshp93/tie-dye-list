import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from "../../../models/task.model";
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'tasks-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnChanges {
  @Input() taskList: TaskList;
  tasks: Task[];

  constructor(private nxTasksService: NxTasksService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTasks();
  }
  
  loadTasks() {
    if (this.taskList)
      this.listTasks(this.taskList.id);
  }

  listTasks(taskListId) {
    this.nxTasksService.listTasks(taskListId).subscribe((result) => {
      this.tasks = result;
      if (this.tasks)
        this.tasks.forEach((task) => console.log(task.title));
    },
    (error) => alert(error));
  }

  selectTask(task: Task) {
    console.log(task);
  }

}
