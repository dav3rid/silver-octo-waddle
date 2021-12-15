import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import QrScanner from './QrScanner';
import Fact from './Fact';
import WebcamView from './WebcamView';

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
      <h1 className="name">Hello {user.name}!</h1>
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
            <WebcamView />
          </>
        )}
        {!isQrVisible && user.progress === 100 && (
          <>
            <p>🎉 🎊 🥳</p>
            <h4>
              Congratulations! You've found all the eggs! You've now been
              entered into our raffle! Good luck!
            </h4>
            <p>🥳 🎊 🎉</p>
            <p>
              Keep an eye out on social media for more information about NC!
            </p>
            <button>
              <a
                href={
                  user.interest === 'student'
                    ? 'https://northcoders.com/our-courses'
                    : 'https://northcoders.com/for-businesses'
                }
                target="_blank"
                rel="noreferrer"
              >
                Visit our website for more information
              </a>
            </button>
          </>
        )}
        {!isQrVisible && user.progress < 100 && (
          <button onClick={() => setIsQrVisible(true)}>Open QR Scanner</button>
        )}
        {user.progress === 0 && (
          <p>
            Instructions: Use the QR code scanner above to find and scan 6 QR
            codes hidden around our stall. When you have found them all, you
            will be entered into a raffle to win a grand prize! Good luck!
          </p>
        )}
      </div>
    </main>
  );
};

export default Hunt;
