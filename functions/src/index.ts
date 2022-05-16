import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { isSameDay, subDays } from 'date-fns';
import { firestore } from 'firebase-admin';

admin.initializeApp();

export const onStreakCreate = functions.firestore
  .document('users/{userId}/streaks/{streakId}')
  .onCreate(async (snapshot, context) => {
    const streakData = snapshot.data();

    if (!streakData) {
      functions.logger.warn('Streak data is empty');
      return;
    }

    const userRef = admin
      .firestore()
      .collection('users')
      .doc(context.params.userId);
    const prevStreaksRef = snapshot.ref.parent
      .orderBy('viewedAt', 'desc')
      .limit(2);
    const prevStreaksSnap = await prevStreaksRef.get();

    if (prevStreaksSnap.size < 2) {
      functions.logger.debug('No previous streak found. Starting new streak');

      await userRef.set({
        streakCount: 1,
      });
      return;
    }

    const prevStreakSnap = prevStreaksSnap.docs[1];
    const prevStreakData = prevStreakSnap.data();
    const prevViewedAt = prevStreakData.viewedAt as firestore.Timestamp;
    const viewedAt = streakData.viewedAt as firestore.Timestamp;
    const dayBefore = subDays(viewedAt.toDate(), 1);

    functions.logger.debug('Previous streak found', {
      prev: prevViewedAt.toDate().toISOString(),
      current: viewedAt.toDate().toISOString(),
      before: dayBefore.toISOString(),
    });

    const sameDay = isSameDay(dayBefore, prevViewedAt.toDate());

    if (sameDay) {
      functions.logger.info('Two last days are consecutive. Incrementing');
      await userRef.set({
        streakCount: admin.firestore.FieldValue.increment(1),
      });
    } else {
      functions.logger.info("Two last days aren't consecutive. Setting to 0");
      await userRef.set({
        streakCount: 1,
      });
    }
  });
