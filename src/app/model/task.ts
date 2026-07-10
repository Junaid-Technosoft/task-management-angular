export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  status: 'PENDING' | 'IN PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
}