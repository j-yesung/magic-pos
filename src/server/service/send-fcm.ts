import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  };
  token: string;
}
export const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const res = await admin.messaging().send(data);

  return res;
};
