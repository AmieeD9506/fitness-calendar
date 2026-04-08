import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { WorkoutRecord } from '../types';

interface CalendarProps {
  markedDates: Record<string, any>;
  records: WorkoutRecord[];
  onDayPress: (day: DateData) => void;
  selectedDate: string;
}

export function WorkoutCalendar({ markedDates, records, onDayPress, selectedDate }: CalendarProps) {
  // 获取记录映射
  const recordsMap = React.useMemo(() => {
    const map = new Map<string, WorkoutRecord>();
    records.forEach(r => map.set(r.date, r));
    return map;
  }, [records]);

  // 自定义日期渲染
  const renderDay = (day: DateData) => {
    const record = recordsMap.get(day.dateString);
    const isToday = day.dateString === new Date().toISOString().split('T')[0];
    const isSelected = day.dateString === selectedDate;

    const handlePress = () => {
      onDayPress(day);
    };

    if (record) {
      const color = record.type === 'cardio' ? '#B39DDB' : '#F48FB1';
      return (
        <TouchableOpacity style={styles.dayContainer} onPress={handlePress}>
          <Text style={styles.dayText}>{day.day}</Text>
          <Text style={[styles.emoji, { color }]}>💪</Text>
        </TouchableOpacity>
      );
    }

    if (isToday) {
      return (
        <TouchableOpacity style={[styles.dayContainer, styles.todayContainer]} onPress={handlePress}>
          <View style={styles.todayCircle}>
            <Text style={[styles.dayText, { color: '#fff' }]}>{day.day}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (isSelected) {
      return (
        <TouchableOpacity style={[styles.dayContainer, styles.selectedContainer]} onPress={handlePress}>
          <View style={styles.selectedCircle}>
            <Text style={[styles.dayText, { color: '#fff' }]}>{day.day}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.dayContainer} onPress={handlePress}>
        <Text style={styles.dayText}>{day.day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        current="2026-01-01"
        minDate="2026-01-01"
        maxDate="2026-12-31"
        onDayPress={onDayPress}
        markedDates={markedDates}
        firstDay={1}
        enableSwipeMonths={true}
        hideExtraDays={true}
        dayComponent={({ date }) => renderDay(date as DateData)}
        monthFormat={'yyyy年 MM月'}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#6200EE',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#6200EE',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: '#6200EE',
          monthTextColor: '#E91E63',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
          textDayHeaderColor: '#6200EE',
        } as any}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
  },
  todayContainer: {
    backgroundColor: '#E3F2FD',
  },
  selectedContainer: {
    backgroundColor: '#FFF3E0',
  },
  todayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#2d4150',
    fontWeight: '500',
  },
  emoji: {
    fontSize: 14,
    marginTop: -4,
  },
});
