import { supabase } from './supabase';
import { WorkoutRecord } from '../types';

export const storage = {
  // 获取所有打卡记录
  async getRecords(): Promise<WorkoutRecord[]> {
    try {
      const { data, error } = await supabase
        .from('workout_records')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching records:', error);
        return [];
      }

      return data.map(item => ({
        date: item.date,
        workoutType: item.workout_type,
        notes: item.notes,
        createdAt: item.created_at
      }));
    } catch (e) {
      console.error('Error reading records:', e);
      return [];
    }
  },

  // 保存打卡记录
  async saveRecord(record: WorkoutRecord): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('workout_records')
        .insert([{
          date: record.date,
          workout_type: record.workoutType,
          notes: record.notes
        }]);

      if (error) {
        console.error('Error saving record:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error saving record:', e);
      return false;
    }
  },

  // 检查某日是否已打卡
  async hasRecord(date: string): Promise<boolean> {
    const records = await this.getRecords();
    return records.some(r => r.date === date);
  },

  // 获取某日的打卡记录
  async getRecord(date: string): Promise<WorkoutRecord | null> {
    const records = await this.getRecords();
    return records.find(r => r.date === date) || null;
  }
};
