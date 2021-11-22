import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from "../../../models/task.model";
import { NxTasksService } from 'src/app/services/nx-tasks.service';
import { BehaviorSubject } from 'rxjs';
import { NaturalLanguageService } from 'src/app/services/natural-language.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'tasks-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnChanges {
  @Input() taskList: TaskList;
  tasks: Task[];
  taskTitle: string;
  showCompletedTasks: boolean;

  constructor(private nxTasksService: NxTasksService, private nlService: NaturalLanguageService, private exportService: ExportService) {}
  
  ngOnInit(): void {
    this.loadShowCompletedTasksFromStorage();
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

    const task = this.nlService.parseTitle(this.taskTitle);

    this.nxTasksService.addTask(this.taskList.id, task, "").subscribe(
      () => {
        this.listTasks(this.taskList.id);
        this.taskTitle = "";
      },
      (error) => alert(error));
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    sessionStorage.setItem('showCompletedTasks', this.showCompletedTasks.toString());
    this.loadTasks();
  }

  private loadShowCompletedTasksFromStorage() {
    const showCompleted = sessionStorage.getItem("showCompletedTasks");
    if (showCompleted) {
      this.showCompletedTasks = showCompleted === 'true';
    } else {
      this.showCompletedTasks = false;
      sessionStorage.setItem('showCompletedTasks', this.showCompletedTasks.toString());
    }
  }

}
