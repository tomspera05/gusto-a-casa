import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { User } from '../types';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const user: User = route.params?.user;

  const handleNotificationPress = () => {
    Alert.alert('Notifiche', 'Funzionalità in arrivo');
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Funzionalità in arrivo');
  };

  const handleBooking = () => {
    navigation.navigate('Booking', { user });
  };

  const handleFeaturePress = (feature: string) => {
    Alert.alert(feature, 'Funzionalità in arrivo');
  };

  return (
    <View style={styles.container}>
      <Header
        userName={user?.firstName}
        onNotificationPress={handleNotificationPress}
        onMenuPress={handleMenuPress}
      />

      <ScrollView style={styles.content}>
        {/* Hero Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerPlaceholder}>
            <Ionicons name="cut-outline" size={60} color="#E0E0E0" />
            <Text style={styles.bannerPlaceholderText}>Immagine Salone</Text>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>
              BENVENUTI SULLA NOSTRA{'\n'}NUOVA APP!
            </Text>
          </View>
        </View>

        {/* Booking Section */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>PRENOTA ORA</Text>
          <Button
            title="PRENOTA ORA"
            onPress={handleBooking}
            variant="primary"
          />
        </View>

        {/* Feature Icons */}
        <View style={styles.featuresContainer}>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => handleFeaturePress('Punti')}
          >
            <View style={styles.featureIcon}>
              <Ionicons name="trophy-outline" size={32} color="#FFB6C1" />
            </View>
            <Text style={styles.featureLabel}>Punti</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => handleFeaturePress('Prepagata')}
          >
            <View style={styles.featureIcon}>
              <Ionicons name="card-outline" size={32} color="#FFB6C1" />
            </View>
            <Text style={styles.featureLabel}>Prepagata</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => handleFeaturePress('Pacchetti')}
          >
            <View style={styles.featureIcon}>
              <Ionicons name="pricetag-outline" size={32} color="#FFB6C1" />
            </View>
            <Text style={styles.featureLabel}>Pacchetti</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  bannerContainer: {
    width: '100%',
  },
  bannerPlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerPlaceholderText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  welcomeSection: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 32,
  },
  bookingSection: {
    padding: 24,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});
