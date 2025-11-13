import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthScreenProps {
  navigation: any;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Errore', 'Inserisci email e password');
      return;
    }

    if (!isLoginMode && (!firstName || !lastName)) {
      Alert.alert('Errore', 'Inserisci nome e cognome');
      return;
    }

    setLoading(true);

    try {
      if (isLoginMode) {
        // Login
        const result = await authService.login(email, password);
        if (result.success && result.user) {
          navigation.replace('Home', { user: result.user });
        } else {
          Alert.alert('Errore', result.error || 'Login fallito');
        }
      } else {
        // Register
        const user: User = {
          firstName,
          lastName,
          email,
          password,
        };

        const result = await authService.register(user);
        if (result.success) {
          navigation.replace('Home', { user });
        } else {
          Alert.alert('Errore', result.error || 'Registrazione fallita');
        }
      }
    } catch (error) {
      Alert.alert('Errore', 'Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo/Title */}
        <View style={styles.header}>
          <Text style={styles.title}>NicoHaircut</Text>
          <Text style={styles.subtitle}>
            {isLoginMode ? 'Bentornato' : 'Benvenuto'}
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {!isLoginMode && (
            <>
              <Input
                label="Nome"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Inserisci il tuo nome"
                autoCapitalize="words"
              />
              <Input
                label="Cognome"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Inserisci il tuo cognome"
                autoCapitalize="words"
              />
            </>
          )}

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Inserisci la tua email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Inserisci la tua password"
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            title={isLoginMode ? 'ACCEDI' : 'REGISTRATI'}
            onPress={handleSubmit}
            variant="primary"
            loading={loading}
          />

          <Button
            title={
              isLoginMode
                ? 'Non hai un account? Registrati'
                : 'Hai già un account? Accedi'
            }
            onPress={() => setIsLoginMode(!isLoginMode)}
            variant="text"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
