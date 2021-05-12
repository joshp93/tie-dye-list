import { ITaskList } from "./itask-list.model";
export class TaskList implements ITaskList {
    kind: string;
    id: string;
    etag: string;
    title: string;
    updated: string;
    selfLink: string;

    constructor(taskList: ITaskList) {
        this.kind = taskList.kind;
        this.id = taskList.id
        this.etag = taskList.etag;
        this.title = taskList.title;
        this.updated = taskList.updated;
        this.selfLink = taskList.selfLink;
    }
}
