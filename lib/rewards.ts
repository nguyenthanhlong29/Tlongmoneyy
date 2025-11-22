import { Task } from '@/types/task';

export function calculateReward(task: Task): number {
  if (task.platform.toLowerCase() === 'facebook') {
    const taskType = task.type.toLowerCase();
    
    if (taskType === 'reaction') {
      return 10;
    }
    
    if (taskType === 'comment') {
      return 30;
    }
  }
  
  return 0;
}
