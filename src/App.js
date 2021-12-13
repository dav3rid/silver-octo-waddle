import './App.css';
import QrReader from 'react-qr-reader';
import { useEffect, useState } from 'react';
import { db } from './firebase.js';

import { doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  const [delay, setDelay] = useState(500);
  const [docRef, setDocRef] = useState(
    doc(db, 'users', '9lp65lfrNNxs8kQsjlTV')
  );

  const handleQrError = (mystery) => {
    console.log(mystery, 'ERROR');
  };
  const handleQrScan = (data) => {
    console.log(data, 'SCAN');
    if (data !== null) {
      const { egg } = JSON.parse(data);
      setDoc(docRef, { [`egg_${egg}`]: true }, { merge: true });
    }
  };

  return (
    <div className="App">
      <p>QR</p>
      <QrReader
        delay={500}
        style={{ width: '200px' }}
        onError={handleQrError}
        onScan={handleQrScan}
      />
    </div>
  );
}

export default App;
