import "./App.css";
import QrReader from "react-qr-reader";
import { useEffect, useState } from "react";
import { db } from "./firebase.js";

import { doc, getDoc, setDoc } from "firebase/firestore";
import SignUp from "./components/SignUp";
import Hunt from "./components/Hunt";

function App() {
  const [user, setUser] = useState(null);
  const [delay, setDelay] = useState(500);
  const [docRef, setDocRef] = useState(
    doc(db, "users", "9lp65lfrNNxs8kQsjlTV")
  );

  const handleQrError = (mystery) => {
    console.log(mystery, "ERROR");
  };
  const handleQrScan = (data) => {
    console.log(data, "SCAN");
    if (data !== null) {
      const { egg } = JSON.parse(data);
      setDoc(docRef, { [`egg_${egg}`]: true }, { merge: true });
    }
  };

  return (
    <div className="App">
      {user ? (
        <>
          <p>QR</p>
          <Hunt user={user} />
          {/* <QrReader
            delay={500}
            style={{ width: "200px" }}
            onError={handleQrError}
            onScan={handleQrScan}
          /> */}
        </>
      ) : (
        <SignUp setUser={setUser} />
      )}
    </div>
  );
}

export default App;
