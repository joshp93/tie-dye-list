import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { AuthService } from 'src/app/services/auth.service';
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'tasks-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() taskListSelectedEvent = new EventEmitter<TaskList>();
  taskListValue: string;
  taskLists: TaskList[];

  constructor(private nxTasksService: NxTasksService, public authService: AuthService) { }

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
        this.selectTaskList(result);
      }
    },
      (error) => alert(error));
  }

  toggleMenu() {
    let menu = document.getElementById('main');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  }
}
