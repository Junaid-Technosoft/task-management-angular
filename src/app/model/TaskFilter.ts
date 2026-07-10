export interface TaskFilter {
  priority: 'ALL' | 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'ALL' | 'PENDING' | 'IN PROGRESS' | 'COMPLETED';
}