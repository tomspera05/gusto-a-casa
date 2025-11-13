import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Service } from '../types';

interface ServiceItemProps {
  service: Service;
  selected: boolean;
  onToggle: () => void;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  selected,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        {/* Checkbox */}
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && (
            <Ionicons name="checkmark" size={18} color="#fff" />
          )}
        </View>

        {/* Service info */}
        <View style={styles.textContainer}>
          <Text style={styles.serviceName}>{service.name}</Text>
          {service.subtitle && (
            <Text style={styles.subtitle}>{service.subtitle}</Text>
          )}
        </View>
      </View>

      {/* Chevron icon */}
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkboxSelected: {
    backgroundColor: '#FFB6C1',
    borderColor: '#FFB6C1',
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C2C2C',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
});
