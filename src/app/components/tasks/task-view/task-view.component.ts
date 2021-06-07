import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from "../../../models/task.model";
import { NxTasksService } from 'src/app/services/nx-tasks.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tasks-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnChanges {
  @Input() taskList: TaskList;
  tasks: Task[];
  taskTitle: string;

  constructor(private nxTasksService: NxTasksService) { }
  showCompletedTasks: boolean = false;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTasks();
  }

  loadTasks() {
    if (this.taskList)
      this.listTasks(this.taskList.id);
  }

  listTasks(taskListId: string) {
    this.nxTasksService.listTasks(taskListId, this.showCompletedTasks).subscribe((result) => {
      this.tasks = result;
    },
      (error) => alert(error));
  }

  addTask() {
    if (!this.taskTitle) {
      return;
    }
    this.nxTasksService.addTask(this.taskList.id, <Task>{
      title: this.taskTitle,
    }, "").subscribe(
      () => {
        this.listTasks(this.taskList.id);
        this.taskTitle = "";
      },
      (error) => alert(error));
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTasks();
  }

}
