import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.devdactic.capalogin',
  appName: 'devdacticLogin',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchShowDuration: 0
    },
    GoogleAuth: {
      scopes: [
        'profile',
        'email'
      ],
      serverClientId: '205383207231-7klatpdv8fisbiokkev92g2b7cn2av18.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
  },
};

export default config;
