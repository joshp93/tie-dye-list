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
  taskModified: boolean;
  minDateInput: string;
  dueDate: string;
  minTimeInput: string;
  dueTime: string;

  constructor(private nxTaskService: NxTasksService) { }

  ngOnInit(): void {
    this.getDueDateInputValue();
  }

  notesUpdate(event) {
    event.target.style.height = "unset";
    this.changeTask();
  }

  sizeTextArea(target: HTMLTextAreaElement) {
    target.style.height = `${target.scrollHeight}px`;
  }

  onInputModified(event: KeyboardEvent) {
    if (event.code.toLowerCase() === "tab" || event.shiftKey || event.ctrlKey || event.altKey) {
      return;
    }
    this.taskModified = true;
    if (event.key.toLowerCase() === "enter") {
      this.changeTask();
    }
  }

  onDueModified() {
    if (this.dueDate == this.task.due.split('T')[0] && this.dueTime == this.task.due.split('T')[1]) {
      return;
    }
    this.taskModified = true;
    this.changeTask();
  }

  onNotesModified(event: KeyboardEvent) {
    if (event.code.toLowerCase() === "tab" || event.shiftKey || event.ctrlKey || event.altKey) {
      return;
    }
    this.taskModified = true;
    this.sizeTextArea((event.target as HTMLTextAreaElement));
  }

  changeTask() {
    if (!this.taskModified) {
      return;
    }
    this.task.due = this.dueDate + "T" + this.dueTime;
    this.nxTaskService.patchTask(this.taskList.id, this.task, "").subscribe(
      () => this.taskChangedEvent.emit(),
      (error) => alert(error));
  }

  selectTask() {
    this.taskSelectedEvent.emit(this.task);
  }

  completeTask() {
    this.taskModified = true;
    this.nxTaskService.completeTask(this.taskList.id, this.task, "").subscribe(
      () => this.taskChangedEvent.emit(),
      (error) => alert(error));
  }

  deleteTask() {
    this.nxTaskService.deleteTask(this.taskList.id, this.task.id).subscribe((result) => {
      if (result)
        this.taskChangedEvent.emit();
    },
      (error) => alert(error));
  }

  getDueDateInputValue() {
    this.dueDate = "";
    this.dueTime = "";
    let dateTimeSplit = new Date().toISOString().split('T');
    this.minDateInput = dateTimeSplit[0];
    this.minTimeInput = dateTimeSplit[1];
    if (this.task.due) {
      dateTimeSplit = this.task.due.split('T');
      this.dueDate = dateTimeSplit[0];
      this.dueTime = dateTimeSplit[1];
    }
  }
}
