import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'tasks-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() taskList: TaskList;
  @Output() taskListSelected = new EventEmitter<string>();
  @Output() taskListChangedEvent = new EventEmitter<string>();
  @ViewChild("titleInput", { static: false }) titleInput: ElementRef;

  renaming: boolean;
  newTitle: string = "";

  constructor(private nxTaskService: NxTasksService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.newTitle = this.taskList.title;
  }

  selectTaskList() {
    this.taskListSelected.emit(this.taskList.id);
  }

  deleteTaskList() {
    this.nxTaskService.deleteList(this.taskList.id).subscribe((result) => {
      if (result)
        this.taskListChangedEvent.emit(this.taskList.id);
    },
      (error) => alert(error));
  }

  renameMode() {
    this.renaming = true;
    this.changeDetectorRef.detectChanges();
    this.titleInput.nativeElement.focus();
    setTimeout(() => {
      this.titleInput.nativeElement.select();
    }, 0);
  }

  renameTaskList() {
    this.nxTaskService.renameList(new TaskList({
      etag: this.taskList.etag,
      id: this.taskList.id,
      kind: this.taskList.kind,
      selfLink: this.taskList.selfLink,
      title: this.newTitle,
      updated: this.taskList.updated
    })).subscribe((result) => this.taskListChangedEvent.emit(this.taskList.id),
      (error) => alert(error));
  }
}
