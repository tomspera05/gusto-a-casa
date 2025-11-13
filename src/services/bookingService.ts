import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, Service } from '../types';

const BOOKINGS_KEY = '@nicohaircut_bookings';

// Simple booking service using AsyncStorage
let bookingsCache: Booking[] = [];

export const bookingService = {
  /**
   * Create a new booking
   */
  async createBooking(
    userId: string,
    date: string,
    time: string,
    services: Service[]
  ): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
      const booking: Booking = {
        id: Date.now().toString(),
        userId,
        date,
        time,
        services,
        createdAt: new Date().toISOString(),
      };

      const existingBookings = await this.getAllBookings();
      existingBookings.push(booking);

      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(existingBookings));
      bookingsCache = existingBookings;

      return { success: true, booking };
    } catch (error) {
      return { success: false, error: 'Errore durante la prenotazione' };
    }
  },

  /**
   * Get all bookings
   */
  async getAllBookings(): Promise<Booking[]> {
    try {
      if (bookingsCache.length > 0) return bookingsCache;

      const bookingsJson = await AsyncStorage.getItem(BOOKINGS_KEY);
      bookingsCache = bookingsJson ? JSON.parse(bookingsJson) : [];
      return bookingsCache;
    } catch (error) {
      return [];
    }
  },

  /**
   * Get bookings for a specific user
   */
  async getUserBookings(userId: string): Promise<Booking[]> {
    const allBookings = await this.getAllBookings();
    return allBookings.filter(b => b.userId === userId);
  },

  /**
   * Get a specific booking by ID
   */
  async getBookingById(bookingId: string): Promise<Booking | null> {
    const bookings = await this.getAllBookings();
    return bookings.find(b => b.id === bookingId) || null;
  },
};
