export interface Task {
    id: number,
    name: string,
    description: string,
    priority: string,
    tag: string,
    done: number, // 0 or 1,
    creation_date:string,
    due_date: string,
    notification_date_range: string,
    notification_date: string
    
}