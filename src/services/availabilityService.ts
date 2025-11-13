import { AvailabilityResult, Service } from '../types';

// Mock availability service
// In a real app, this would call a backend API

// Unavailable time slots for demo (format: "YYYY-MM-DD HH:MM")
const UNAVAILABLE_SLOTS = new Set([
  '2025-11-14 10:00',
  '2025-11-14 14:00',
  '2025-11-14 16:30',
  '2025-11-15 11:00',
  '2025-11-15 15:00',
]);

export const availabilityService = {
  /**
   * Check if a given date/time is available for the selected services
   * @param date - Date string in YYYY-MM-DD format
   * @param time - Time string in HH:MM format
   * @param selectedServices - Array of selected services
   * @returns AvailabilityResult with available flag and alternative slots
   */
  checkAvailability(
    date: string,
    time: string,
    selectedServices: Service[]
  ): AvailabilityResult {
    const requestedSlot = `${date} ${time}`;

    // Check if the requested slot is unavailable
    const available = !UNAVAILABLE_SLOTS.has(requestedSlot);

    if (available) {
      return {
        available: true,
        alternativeSlots: [],
      };
    }

    // If not available, generate alternative time slots
    const alternativeSlots = this.getAlternativeSlots(date);

    return {
      available: false,
      alternativeSlots,
    };
  },

  /**
   * Get available time slots for a given date
   * @param date - Date string in YYYY-MM-DD format
   * @param limit - Number of slots to return (default: 6)
   * @returns Array of available time strings in HH:MM format
   */
  getAlternativeSlots(date: string, limit: number = 6): string[] {
    const slots: string[] = [];
    const baseHours = [9, 10, 11, 12, 14, 15, 16, 17, 18];
    const minutes = ['00', '15', '30', '45'];

    // Generate time slots for the day
    for (const hour of baseHours) {
      for (const minute of minutes) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute}`;
        const fullSlot = `${date} ${timeSlot}`;

        // Only include if not in unavailable list
        if (!UNAVAILABLE_SLOTS.has(fullSlot)) {
          slots.push(timeSlot);

          if (slots.length >= limit) {
            return slots;
          }
        }
      }
    }

    return slots;
  },

  /**
   * Load more time slots (for "CARICA ALTRI" button)
   * @param date - Date string in YYYY-MM-DD format
   * @param currentSlots - Currently displayed slots
   * @param additionalCount - Number of additional slots to load
   * @returns Array of additional available time strings
   */
  loadMoreSlots(date: string, currentSlots: string[], additionalCount: number = 6): string[] {
    const allSlots = this.getAllSlotsForDate(date);
    const newSlots: string[] = [];

    for (const slot of allSlots) {
      if (!currentSlots.includes(slot)) {
        newSlots.push(slot);

        if (newSlots.length >= additionalCount) {
          break;
        }
      }
    }

    return newSlots;
  },

  /**
   * Get all available time slots for a date
   * @param date - Date string in YYYY-MM-DD format
   * @returns Array of all available time strings
   */
  getAllSlotsForDate(date: string): string[] {
    return this.getAlternativeSlots(date, 100); // Get up to 100 slots
  },
};
