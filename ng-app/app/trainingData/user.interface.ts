export interface User {
    name: string;
    age?: number;
    gender?: string;
    role?: string;
    isActive?: boolean;
    topics?: string[];
    toggle?: string;
}