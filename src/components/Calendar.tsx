import React from 'react';
  import { View, StyleSheet } from 'react-native';
  import { Calendar, DateData } from 'react-native-calendars';
  import { WorkoutRecord } from '../types';

  interface CalendarProps {
    markedDates: Record<string, any>;
    records: WorkoutRecord[];
    onDayPress: (day: DateData) => void;
    selectedDate: string;
  }

  export function WorkoutCalendar({ markedDates, records, onDayPress, selectedDate }: CalendarProps) {
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          firstDay={1}
          hideExtraDays={true}
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
          }}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
  });
