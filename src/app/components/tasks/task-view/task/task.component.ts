import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'tasks-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() taskList: TaskList;
  @Output() taskSelectedEvent = new EventEmitter<Task>();
  @Output() taskChangedEvent = new EventEmitter<void>();
  newTitle: string;
  newNotes: string;

  constructor(private nxTaskService: NxTasksService) { }

  ngOnInit(): void {
  }

  notesUpdate(event) {
    event.target.style.height = "unset";
    this.changeTask();
  }

  sizeTextArea(event) {
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  changeTask() {
    this.nxTaskService.patchTask(this.taskList.id, this.task, "").subscribe(
      () => this.taskChangedEvent.emit(),
      (error) => alert(error));
  }

  selectTask() {
    this.taskSelectedEvent.emit(this.task);
  }

  deleteTask() {
    this.nxTaskService.deleteTask(this.taskList.id, this.task.id).subscribe((result) => {
      if (result)
        this.taskChangedEvent.emit();
    },
      (error) => alert(error));
  }
}
