# NicoHaircut Mobile App

A cross-platform (iOS + Android) mobile application for a hair salon, built with React Native and Expo.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (available on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) and [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gusto-a-casa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or
expo start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## 📱 Features

### Authentication
- User registration with first name, last name, email, and password
- Login for existing users
- Toggle between login and signup modes
- User data stored in AsyncStorage

### Home Screen
- Personalized greeting with user's first name
- Hero banner section
- "PRENOTA ORA" booking call-to-action
- Three feature icons: Punti, Prepagata, Pacchetti (placeholder functionality)

### Booking System
- Date picker for selecting appointment date
- Time picker for selecting appointment time
- Search bar for filtering services
- Multiple service selection with checkboxes
- Real-time form validation

### Availability System
- Mock availability checking system
- "Prenotazione non Disponibile" modal when time slot is unavailable
- Alternative time slots display
- "TROVA ORARI LIBERI" functionality

### Available Slots Screen
- Display of available time slots for selected date
- Clickable time slot pills
- "CARICA ALTRI" button to load more slots
- Easy navigation back to booking screen

### Booking Confirmation
- Success confirmation screen
- Display of booking details (date, time, services)
- Option to return to home screen
- Booking saved to AsyncStorage

## 🎨 Design

The app follows a minimal, professional design aesthetic:

- **Primary Color**: Light Pink (#FFB6C1)
- **Background**: White (#FFFFFF)
- **Text**: Dark Brown/Black (#2C2C2C)
- **Secondary Text**: Grey (#666666, #999999)
- **Borders**: Light Grey (#E0E0E0)

All UI text is in Italian, while code comments and documentation are in English.

## 📂 Project Structure

```
gusto-a-casa/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── ServiceItem.tsx
│   │   └── TimeSlot.tsx
│   ├── data/               # Static data
│   │   └── services.ts     # Service list
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── AuthScreen.tsx
│   │   ├── AvailableSlotsScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── ConfirmationScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── services/           # Business logic
│   │   ├── authService.ts
│   │   ├── availabilityService.ts
│   │   └── bookingService.ts
│   └── types/              # TypeScript type definitions
│       └── index.ts
├── App.tsx                 # App entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## ⚙️ Configuration

### Modifying Services

To add, remove, or modify services:

1. Open `src/data/services.ts`
2. Edit the `SERVICES` array:

```typescript
export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'TAGLIO UOMO',
    duration: 30, // in minutes
  },
  {
    id: '2',
    name: 'TAGLIO BIMBO',
    subtitle: 'BIMBO SOTTO I 10 ANNI', // optional subtitle
    duration: 20,
  },
  // Add more services here...
];
```

### Configuring Availability Logic

The availability system is located in `src/services/availabilityService.ts`.

**To modify unavailable time slots:**

```typescript
// Edit the UNAVAILABLE_SLOTS set (format: "YYYY-MM-DD HH:MM")
const UNAVAILABLE_SLOTS = new Set([
  '2025-11-14 10:00',
  '2025-11-14 14:00',
  // Add more unavailable slots...
]);
```

**To adjust working hours:**

```typescript
// Edit the baseHours and minutes arrays in getAlternativeSlots()
const baseHours = [9, 10, 11, 12, 14, 15, 16, 17, 18]; // Working hours
const minutes = ['00', '15', '30', '45']; // Time slot intervals
```

**To integrate with a real backend:**

Replace the mock functions in `availabilityService.ts` with API calls:

```typescript
export const availabilityService = {
  async checkAvailability(date, time, selectedServices) {
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: JSON.stringify({ date, time, services: selectedServices }),
    });
    return await response.json();
  },
  // ... other methods
};
```

### Customizing Colors

To change the color scheme, update the color values in the component StyleSheets:

- **Primary Pink**: `#FFB6C1` (used in buttons, accents)
- **Dark Text**: `#2C2C2C` (main text color)
- **Light Background**: `#F8F8F8` (secondary backgrounds)

### Adding Real Backend Integration

The app currently uses AsyncStorage for data persistence. To integrate with a real backend:

1. **Authentication**: Update `src/services/authService.ts`
2. **Bookings**: Update `src/services/bookingService.ts`
3. **Availability**: Update `src/services/availabilityService.ts`

Example:

```typescript
// In authService.ts
async login(email: string, password: string) {
  const response = await fetch('https://your-api.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}
```

## 🧪 Testing

To test on different devices:

```bash
# iOS Simulator (macOS only)
npm run ios

# Android Emulator
npm run android

# Web browser (for testing, not production)
npm run web
```

## 📦 Building for Production

### Build for iOS

```bash
expo build:ios
```

### Build for Android

```bash
expo build:android
```

For more details, refer to the [Expo documentation](https://docs.expo.dev/build/setup/).

## 🛠️ Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo SDK 51**: Development and build toolchain
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data persistence
- **Expo Vector Icons**: Icon library
- **React Native DateTimePicker**: Date and time selection

## 📝 Notes

- User authentication data is stored locally in AsyncStorage (no password encryption)
- Bookings are stored locally and will be cleared if app data is cleared
- The availability system uses mock data - integrate with a real API for production
- All dates are in YYYY-MM-DD format, displayed as DD-MM-YYYY to users
- Time slots are in 15-minute intervals

## 🐛 Troubleshooting

**Metro bundler cache issues:**
```bash
expo start -c
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**iOS/Android build errors:**
- Make sure you have the latest Expo CLI
- Try `expo upgrade` to update dependencies
- Check [Expo documentation](https://docs.expo.dev/) for platform-specific issues

## 📄 License

This project is private and proprietary.

## 👤 Author

Created for NicoHaircut salon.
