import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DateData } from 'react-native-calendars';
import { Header } from './src/components/Header';
import { WorkoutCalendar } from './src/components/Calendar';
import { WorkoutDialog } from './src/components/WorkoutDialog';
import { useWorkoutRecords } from './src/hooks/useWorkoutRecords';
import { dateUtils } from './src/utils/dateUtils';

export default function App() {
  const {
    totalCount,
    addRecord,
    hasRecord,
    getMarkedDates,
    records,
  } = useWorkoutRecords();

  const [selectedDate, setSelectedDate] = useState<string>(
    dateUtils.formatDate(new Date())
  );
  const [dialogVisible, setDialogVisible] = useState(false);

  const markedDates = getMarkedDates();

  // 判断选中日期是否为今天
  const isToday = dateUtils.isToday(dateUtils.parseDate(selectedDate));
  const hasWorkoutRecord = hasRecord(selectedDate);

  // 处理日期点击
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  // 处理打卡按钮点击
  const handleCheckInPress = () => {
    if (hasWorkoutRecord) {
      Alert.alert('提示', '这一天已经打过卡了，不能重复打卡哦！');
      return;
    }
    setDialogVisible(true);
  };

  // 处理对话框确认
  const handleDialogConfirm = async (type: 'cardio' | 'no-cardio') => {
    const success = await addRecord(selectedDate, type);
    if (!success) {
      Alert.alert('错误', '打卡失败，请重试');
    }
    setDialogVisible(false);
  };

  // 按钮文字和样式
  const buttonText = isToday ? '打卡' : '补打卡';
  const buttonColor = isToday ? '#6200EE' : '#FF9800';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header totalCount={totalCount} />

      <WorkoutCalendar
        markedDates={markedDates}
        records={records}
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: buttonColor }]}
        onPress={handleCheckInPress}
      >
        <Text style={styles.fabText}>{buttonText}</Text>
      </TouchableOpacity>

      <WorkoutDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onConfirm={handleDialogConfirm}
        title={buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
