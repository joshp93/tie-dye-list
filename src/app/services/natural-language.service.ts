import { Injectable } from '@angular/core';
import { ITask } from '../models/itask.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class NaturalLanguageService {

  private weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private weekDaysShort = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
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
    }

    let day = this.findDayInArray(title, this.weekDays);
    let dayShort = this.findDayInArray(title, this.weekDaysShort);

    if (day) {
      due = this.getNextDayOfWeek(new Date(), this.getDayNumber(day));
      title = this.removeDayTextFromTitle(title, day).trim();
    } else if (dayShort) {
      due = this.getNextDayOfWeek(new Date(), this.getDayNumber(dayShort));
      title = this.removeDayTextFromTitle(title, dayShort).trim();
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

  private findDayInArray(title: string, array: Array<string>): string {
    const words = title.split(' ');
    let found = false;
    let returnWord = "";
    array.forEach(day => {
      if (found) {
        return;
      }
      words.forEach(word => {
        if (word === day) {
          found = true;
          returnWord = word;
          return;
        }
      });
    });
    return returnWord;
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
    if (title.toLowerCase() === dayString.toLowerCase()) {
      return title;
    }
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
