import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import QrScanner from './QrScanner';
import Fact from './Fact';

const Hunt = ({ user, setUser }) => {
  const [isQrVisible, setIsQrVisible] = useState(true);
  const [fact, setFact] = useState('');
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', user.id), (doc) => {
      const userData = doc.data();
      const trueEggsNum = Object.values(userData).filter(
        (value) => value === true
      ).length;
      const progressPercent = Math.round((trueEggsNum / 6) * 100);
      setUser((currUser) => {
        const updatedUser = { ...currUser, progress: progressPercent };
        return updatedUser;
      });
    });
    return unsubscribe;
  }, [user.id, setUser]);

  const showSelfieCam =
    !isQrVisible && user.progress > 80 && user.progress < 99;

  return (
    <main className="hunt">
      <h1>Hello {user.name}!</h1>
      <ProgressBar progress={user.progress} />

      <div className="hunt-content">
        {isQrVisible && (
          <QrScanner
            setIsQrVisible={setIsQrVisible}
            setFact={setFact}
            id={user.id}
          />
        )}
        {!isQrVisible && user.progress < 80 && (
          <Fact setIsQrVisible={setIsQrVisible} fact={fact} />
        )}
        {showSelfieCam && (
          <>
            <p>What do you think a typical developer looks like?</p>
            <input type="file" accept="image/*" capture="user" />
          </>
        )}
        {!isQrVisible && user.progress === 100 && (
          <p>well done you've finished</p>
        )}
        {!isQrVisible && user.progress < 100 && (
          <button onClick={() => setIsQrVisible(true)}>Open QR Scanner</button>
        )}
      </div>
      {user.progress === 0 && (
        <p>
          Instructions: Use the QR code scanner below to find and scan 6 QR
          codes hidden around our stall. When you have found them all go and
          speak to a member of staff to claim your prize/be entered into a
          raffle Good luck!
        </p>
      )}
    </main>
  );
};

export default Hunt;
