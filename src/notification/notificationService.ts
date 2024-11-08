import notifee, { AndroidImportance } from '@notifee/react-native';

// Create notification channel (Android only)
export const createNotificationChannel = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  console.log('Notification Channel Created:', channelId);
};

// Function to display notification with dynamic title and body
export const displayNotification = async (title: string, body: string) => {
  // Ensure notification channel is created first
  await createNotificationChannel();

  // Display notification
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // Android requires a small icon
      importance: AndroidImportance.HIGH,
      sound: 'default',
    },
  });
};
