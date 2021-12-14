import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';

const Hunt = ({ user, setUser }) => {
  useEffect(() => {
    console.log('hello');
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
  }, []);
  return (
    <div>
      <ProgressBar progress={user.progress} />
      <h1>Hello {user.name}!</h1>
      {user.progress === 0 ? <p>instructions here...</p> : null}
    </div>
  );
};

export default Hunt;
