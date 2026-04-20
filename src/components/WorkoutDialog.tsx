import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface WorkoutDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (type: 'cardio' | 'no-cardio') => void;
  title: string;
}

export function WorkoutDialog({ visible, onClose, onConfirm, title }: WorkoutDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.question}>是否有氧？</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cardioButton]}
              onPress={() => onConfirm('cardio')}
            >
              <Text style={styles.buttonText}>是</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.noCardioButton]}
              onPress={() => onConfirm('no-cardio')}
            >
              <Text style={styles.buttonText}>否</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  question: {
    fontSize: 16,
    marginBottom: 24,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardioButton: {
    backgroundColor: '#B39DDB',
  },
  noCardioButton: {
    backgroundColor: '#F48FB1',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
  },
});
