import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TimeSlotProps {
  time: string;
  onPress: () => void;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ time, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFB6C1',
    marginRight: 12,
    marginBottom: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});
