export const createFirebaseNodeApp = async () => {
  const admin = await import('firebase-admin');

  if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_ADMIN_PRODUCTION;

    if (!serviceAccount) {
      throw new Error('FIREBASE_ADMIN_PRODUCTION must set');
    }

    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
    });
  }

  return admin;
};
