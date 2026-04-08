import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { WorkoutRecord, WorkoutType } from '../types';

export function useWorkoutRecords() {
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载记录
  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    const data = await storage.getRecords();
    setRecords(data);
    setLoading(false);
  };

  // 添加打卡记录
  const addRecord = async (date: string, type: WorkoutType): Promise<boolean> => {
    const success = await storage.saveRecord({ date, type });
    if (success) {
      await loadRecords();
    }
    return success;
  };

  // 检查某日是否已打卡
  const hasRecord = (date: string): boolean => {
    return records.some(r => r.date === date);
  };

  // 获取某日的打卡记录
  const getRecord = (date: string): WorkoutRecord | undefined => {
    return records.find(r => r.date === date);
  };

  // 统计总次数
  const totalCount = records.length;

  // 获取已打卡日期的映射（用于日历标记）
  const getMarkedDates = () => {
    const marked: Record<string, any> = {};
    records.forEach(record => {
      const color = record.type === 'cardio' ? '#B39DDB' : '#F48FB1'; // 淡紫色/粉红色
      marked[record.date] = {
        customStyles: {
          container: {
            backgroundColor: `${color}20`,
          },
          text: {
            color: '#000',
            fontWeight: 'bold',
          },
        },
        workoutType: record.type,
      };
    });
    return marked;
  };

  return {
    records,
    loading,
    totalCount,
    addRecord,
    hasRecord,
    getRecord,
    getMarkedDates,
  };
}
