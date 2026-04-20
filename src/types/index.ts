export type WorkoutType = 'cardio' | 'no-cardio';

export interface WorkoutRecord {
  date: string;      // 格式: "YYYY-MM-DD"
  type: WorkoutType;
}

export interface WorkoutData {
  records: WorkoutRecord[];
}
