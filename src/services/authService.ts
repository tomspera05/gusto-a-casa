import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USERS_KEY = '@nicohaircut_users';
const CURRENT_USER_KEY = '@nicohaircut_current_user';

// Simple in-memory storage for demo purposes
let usersCache: User[] = [];

export const authService = {
  // Register a new user
  async register(user: User): Promise<{ success: boolean; error?: string }> {
    try {
      // Load existing users
      const existingUsers = await this.getAllUsers();

      // Check if email already exists
      if (existingUsers.some(u => u.email === user.email)) {
        return { success: false, error: 'Email già registrata' };
      }

      // Add new user
      existingUsers.push(user);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
      usersCache = existingUsers;

      // Set as current user
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Errore durante la registrazione' };
    }
  },

  // Login existing user
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const users = await this.getAllUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return { success: false, error: 'Email o password non corretti' };
      }

      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Errore durante il login' };
    }
  },

  // Get current logged-in user
  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      return null;
    }
  },

  // Logout
  async logout(): Promise<void> {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  },

  // Get all users (for login check)
  async getAllUsers(): Promise<User[]> {
    try {
      if (usersCache.length > 0) return usersCache;

      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      usersCache = usersJson ? JSON.parse(usersJson) : [];
      return usersCache;
    } catch (error) {
      return [];
    }
  },
};
