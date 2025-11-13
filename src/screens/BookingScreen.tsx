import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ServiceItem } from '../components/ServiceItem';
import { Modal } from '../components/Modal';
import { SERVICES } from '../data/services';
import { Service, User } from '../types';
import { availabilityService } from '../services/availabilityService';

interface BookingScreenProps {
  navigation: any;
  route: any;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({ navigation, route }) => {
  const user: User = route.params?.user;
  const prefilledTime = route.params?.selectedTime;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(
    prefilledTime ? new Date(`2000-01-01T${prefilledTime}`) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [alternativeSlots, setAlternativeSlots] = useState<string[]>([]);

  const handleServiceToggle = (service: Service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleProceed = () => {
    if (selectedServices.length === 0) {
      Alert.alert('Attenzione', 'Seleziona almeno un servizio');
      return;
    }

    // Check availability
    const dateStr = formatDate(selectedDate);
    const timeStr = formatTime(selectedTime);

    const result = availabilityService.checkAvailability(
      dateStr,
      timeStr,
      selectedServices
    );

    if (result.available) {
      // Navigate to confirmation
      navigation.navigate('Confirmation', {
        user,
        date: dateStr,
        time: timeStr,
        services: selectedServices,
      });
    } else {
      // Show unavailable modal
      setAlternativeSlots(result.alternativeSlots);
      setShowUnavailableModal(true);
    }
  };

  const handleFindAvailableSlots = () => {
    setShowUnavailableModal(false);
    navigation.navigate('AvailableSlots', {
      user,
      date: formatDate(selectedDate),
      alternativeSlots,
    });
  };

  const filteredServices = SERVICES.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFormValid = selectedServices.length > 0;

  return (
    <View style={styles.container}>
      <Header
        userName={user?.firstName}
        onNotificationPress={() => Alert.alert('Notifiche', 'Funzionalità in arrivo')}
        onMenuPress={() => Alert.alert('Menu', 'Funzionalità in arrivo')}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Seleziona uno o più Servizi</Text>

        {/* Date Picker */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Data</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.pickerText}>{formatDisplayDate(selectedDate)}</Text>
            <Ionicons name="calendar-outline" size={20} color="#999" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) setSelectedDate(date);
              }}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Time Picker */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Orario</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.pickerText}>{formatTime(selectedTime)}</Text>
            <Ionicons name="time-outline" size={20} color="#999" />
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, time) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (time) setSelectedTime(time);
              }}
              minuteInterval={15}
            />
          )}
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Text style={styles.label}>Cerca un servizio</Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchPlaceholder}>Cerca un servizio</Text>
            <Ionicons name="search" size={20} color="#999" />
          </View>
        </View>

        {/* Services List */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Servizio</Text>
          {filteredServices.map(service => (
            <ServiceItem
              key={service.id}
              service={service}
              selected={!!selectedServices.find(s => s.id === service.id)}
              onToggle={() => handleServiceToggle(service)}
            />
          ))}
        </View>

        {/* Proceed Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="PROCEDI"
            onPress={handleProceed}
            variant="primary"
            disabled={!isFormValid}
          />
        </View>
      </ScrollView>

      {/* Unavailable Modal */}
      <Modal
        visible={showUnavailableModal}
        onClose={() => setShowUnavailableModal(false)}
        title="Prenotazione non Disponibile"
        message="Non è possibile prenotare i servizi scelti a quest'ora."
        primaryButtonText="TROVA ORARI LIBERI"
        onPrimaryButtonPress={handleFindAvailableSlots}
        icon={<Ionicons name="calendar-outline" size={48} color="#FFB6C1" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    padding: 20,
    paddingBottom: 12,
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  pickerText: {
    fontSize: 16,
    color: '#2C2C2C',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#999',
  },
  servicesSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 24,
  },
});
