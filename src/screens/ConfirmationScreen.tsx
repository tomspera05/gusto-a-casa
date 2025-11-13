import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { bookingService } from '../services/bookingService';
import { Service, User } from '../types';

interface ConfirmationScreenProps {
  navigation: any;
  route: any;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { user, date, time, services }: {
    user: User;
    date: string;
    time: string;
    services: Service[];
  } = route.params;

  useEffect(() => {
    // Save the booking
    bookingService.createBooking(user.email, date, time, services);
  }, []);

  const formatDisplayDate = (dateStr: string) => {
    // Convert YYYY-MM-DD to DD/MM/YYYY
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleGoHome = () => {
    navigation.navigate('Home', { user });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={60} color="#fff" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Prenotazione confermata</Text>
        <Text style={styles.subtitle}>
          Il tuo appuntamento è stato prenotato con successo.
        </Text>

        {/* Booking Details Card */}
        <View style={styles.detailsCard}>
          {/* Date */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="calendar-outline" size={24} color="#FFB6C1" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Data</Text>
              <Text style={styles.detailValue}>{formatDisplayDate(date)}</Text>
            </View>
          </View>

          {/* Time */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="time-outline" size={24} color="#FFB6C1" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Orario</Text>
              <Text style={styles.detailValue}>{time}</Text>
            </View>
          </View>

          {/* Services */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="cut-outline" size={24} color="#FFB6C1" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Servizi</Text>
              {services.map((service, index) => (
                <Text key={service.id} style={styles.detailValue}>
                  {service.name}
                  {service.subtitle && ` (${service.subtitle})`}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={24} color="#666" />
          <Text style={styles.infoText}>
            Riceverai una notifica prima del tuo appuntamento.
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="TORNA ALLA HOME"
            onPress={handleGoHome}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 2,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
