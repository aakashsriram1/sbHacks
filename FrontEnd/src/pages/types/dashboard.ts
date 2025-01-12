export interface Task {
    id: string;
    name: string;
  }
  
  export interface UserProfile {
    name: string;
    email: string;
    avatar: string;
  }
  
  export interface DashboardData {
    tasks: Task[];
    streakLengths: number[];
  }
  
  