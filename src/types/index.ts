// Type definitions for the app

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Service {
  id: string;
  name: string;
  subtitle?: string;
  duration: number; // in minutes
}

export interface Booking {
  id: string;
  userId: string;
  date: string;
  time: string;
  services: Service[];
  createdAt: string;
}

export interface AvailabilityResult {
  available: boolean;
  alternativeSlots: string[];
}
