
export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  email: string;
  phone: string;
  password: string;
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  instructor: string;
  startTime: string;
  endTime: string;
  image?: string;
  status: "upcoming" | "live" | "completed";
}

export interface Category {
  name: string;
}