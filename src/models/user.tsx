export interface User {
    employeeId: number;
    name: string;
    isActive: boolean
    birthday: any
}

export interface UserList extends User {
    dateCreated: any
}