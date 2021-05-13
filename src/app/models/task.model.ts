import { ITask } from "./itask.model";

export class Task {
    kind: string;
    id: string;
    etag: string;
    title: string;
    updated: string;
    selfLink: string;
    parent: string;
    position: string;
    notes: string;
    status: string;
    due: string;
    completed: string;
    deleted: string;
    hidden: string;
    links: object;

    constructor(task: ITask) {
        this.kind = task.kind;
        this.id = task.id;
        this.etag = task.etag;
        this.title = task.title;
        this.updated = task.updated;
        this.selfLink = task.selfLink;
        this.parent = task.parent;
        this.position = task.position;
        this.notes = task.notes;
        this.status = task.status;
        this.due = task.due;
        this.completed = task.completed;
        this.deleted = task.deleted;
        this.hidden = task.hidden;
        this.links = task.links;
    }
}
