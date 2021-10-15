import { Injectable } from '@angular/core';
import { ITask } from '../models/itask.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class NaturalLanguageService {

  private static weekdaysRegEx = "mon|tue|wed|thu|fri|sat|sun";
  private weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  constructor() { }

  parseTitle(title: string) {
    let due: Date;
    if (title.includes('today')) {
      title = title.replace('today', '').trim();
      due = new Date();
    } else if (title.includes('tomorrow')) {
      title = title.replace('tomorrow', '').trim();
      due = new Date();
      due.setDate(due.getDate() + 1);
    } else if (new RegExp(NaturalLanguageService.weekdaysRegEx).test(title.toLowerCase())) {
      const result = new RegExp(NaturalLanguageService.weekdaysRegEx).exec(title.toLowerCase())[0];
      due = this.getNextDayOfWeek(new Date(), this.getDayNumber(result));
      title = this.removeDayTextFromTitle(title, result).trim();
    }

    if (due) {
      return {
        title,
        due: due.toISOString()
      } as ITask;
    } else {
      return {
        title
      } as ITask
    }
  }

  private getDayNumber(dayString: string): number {
    let dayNumber = -1;
    this.weekDays.forEach(day => {
      if (day.toLowerCase().includes(dayString.toLowerCase())) {
        dayNumber = this.weekDays.indexOf(day);
      }
    });
    return dayNumber;
  }

  private removeDayTextFromTitle(title: string, dayString: string): string {
    const words = title.split(' ')
    words.forEach(word => {
      if (word.toLowerCase().includes(dayString.toLowerCase())) {
        title = title.replace(word, '');
      }
    });
    return title;
  }

  private getNextDayOfWeek(date: Date, dayOfWeek: number): Date {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
  }
}
