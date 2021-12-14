import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const QrScanner = ({ setIsQrVisible, setFact, id }) => {
  const handleQrError = (mystery) => {
    console.log(mystery, 'ERROR');
  };
  const handleQrScan = (data) => {
    console.log(data, 'SCAN');
    if (data !== null) {
      const { egg, fact } = JSON.parse(data);
      if (egg && fact) {
        const userDocRef = doc(db, 'users', id);
        setDoc(userDocRef, { [`egg_${egg}`]: true }, { merge: true }).then(
          () => {
            setFact(fact);
            setIsQrVisible(false);
          }
        );
      }
    }
  };
  return (
    <QrReader
      delay={500}
      style={{ width: '80%', maxWidth: '400px' }}
      onError={handleQrError}
      onScan={handleQrScan}
    />
  );
};

export default QrScanner;
