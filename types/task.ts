export interface Task {
  id: string;
  platform: string;
  type: string;
  title: string;
  source: 'bumx' | 'golike';
}

export interface TaskDetails extends Task {
  description?: string;
  url?: string;
  instructions?: string;
  targetId?: string;
}
