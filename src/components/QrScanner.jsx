import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QrScanner = () => {
  const [delay, setDelay] = useState(500);

  const handleQrError = (mystery) => {
    console.log(mystery, 'ERROR');
  };
  const handleQrScan = (data) => {
    console.log(data, 'SCAN');
    if (data !== null) {
      const { egg } = JSON.parse(data);
      //setDoc(docRef, { [`egg_${egg}`]: true }, { merge: true });
    }
  };
  return (
    <QrReader
      delay={500}
      style={{ width: '200px' }}
      onError={handleQrError}
      onScan={handleQrScan}
    />
  );
};

export default QrScanner;
