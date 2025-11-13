import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  onNotificationPress,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left side - User greeting */}
        <View style={styles.leftSection}>
          <Ionicons name="person-circle-outline" size={32} color="#2C2C2C" />
          {userName && (
            <Text style={styles.greeting}>ciao {userName}</Text>
          )}
        </View>

        {/* Right side - Notification and menu */}
        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={onNotificationPress}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMenuPress}
            style={styles.iconButton}
          >
            <Ionicons name="menu" size={28} color="#2C2C2C" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom separator line */}
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#FFB6C1',
    marginTop: 10,
    marginHorizontal: 20,
  },
});
