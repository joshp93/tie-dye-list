import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToCSV(tasks: Array<Task>, taskListName: string) {
    if (!tasks || tasks.length === 0) {
      return;
    }
    
    let headers = "";
    Object.keys(tasks[0]).forEach(key => {
      headers += `${key},`
    });
    headers = headers.slice(0, -1) + "\r\n";
    let csvContent = "data:text/csv;charset=utf-8," + headers + tasks.map(task => {
      let taskContent = "";
      Object.values(task).forEach(value => taskContent += `${value},`);
      return `${taskContent.slice(0, -1)}\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${taskListName.replace(" ", "_")}.csv`);
    document.body.appendChild(link);

    link.click();
  }
}
