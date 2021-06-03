export interface ITask {
    kind: string;
    id: string;
    etag: string;
    title: string;
    updated: Date;
    selfLink: string;
    parent: string;
    position: string;
    notes: string;
    status: string;
    due: Date;
    completed: Date;
    deleted: boolean;
    hidden: boolean;
    links: object;
}
