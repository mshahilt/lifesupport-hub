export interface User {
    id?: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
}

interface ICategory {
    id?: string;
    name: string;
}

export interface LiveSession {
    _id: string;
    title: string;
    description: string;
    category: ICategory;
    instructor: string;
    startTime: string;
    endTime: string;
    image?: string;
    status: "upcoming" | "live" | "completed";
}

export interface ActiveLesson {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
}

export interface StudentAnalytics {
    totalStudents: number;
    maleStudents: number;
    femaleStudents: number;
}

export interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
}