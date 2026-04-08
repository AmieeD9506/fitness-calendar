import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  totalCount: number;
}

export function Header({ totalCount }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>阿戴的锻炼日历</Text>
      <Text style={styles.count}>{totalCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});
