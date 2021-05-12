import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { NxTasksService } from 'src/app/services/nx-tasks.service';

@Component({
  selector: 'lists-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  taskLists: TaskList[]

  constructor(private nxTasksService: NxTasksService) { }

  ngOnInit(): void {
    this.nxTasksService.listTaskLists().subscribe((result) => {
      this.taskLists = result;
      console.log(this.taskLists, result);
    });
  }

}
