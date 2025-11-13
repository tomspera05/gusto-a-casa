import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimeSlot } from '../components/TimeSlot';
import { Button } from '../components/Button';
import { availabilityService } from '../services/availabilityService';

interface AvailableSlotsScreenProps {
  navigation: any;
  route: any;
}

export const AvailableSlotsScreen: React.FC<AvailableSlotsScreenProps> = ({
  navigation,
  route,
}) => {
  const { user, date, alternativeSlots: initialSlots } = route.params;

  const [availableSlots, setAvailableSlots] = useState<string[]>(
    initialSlots || availabilityService.getAlternativeSlots(date)
  );

  const formatDisplayDate = (dateStr: string) => {
    // Convert YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleSlotPress = (time: string) => {
    // Navigate back to booking screen with selected time
    Alert.alert(
      'Orario selezionato',
      `Hai selezionato l'orario: ${time}`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Booking', {
              user,
              selectedTime: time,
            });
          },
        },
      ]
    );
  };

  const handleLoadMore = () => {
    const moreSlots = availabilityService.loadMoreSlots(date, availableSlots, 6);
    setAvailableSlots([...availableSlots, ...moreSlots]);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Status bar area */}
      <View style={styles.statusBar} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Ionicons name="calendar-outline" size={24} color="#2C2C2C" />
            <Text style={styles.dateText}>{formatDisplayDate(date)}</Text>
          </View>

          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <View style={styles.closeIcon}>
              <Ionicons name="close" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Di seguito gli orari disponibili</Text>

        {/* Time Slots Grid */}
        <View style={styles.slotsContainer}>
          {availableSlots.map((slot, index) => (
            <TimeSlot
              key={`${slot}-${index}`}
              time={slot}
              onPress={() => handleSlotPress(slot)}
            />
          ))}
        </View>

        {/* Load More Button */}
        <View style={styles.loadMoreContainer}>
          <Button
            title="CARICA ALTRI"
            onPress={handleLoadMore}
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 44,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB6C1',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 24,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  loadMoreContainer: {
    marginTop: 24,
    marginBottom: 20,
  },
});
