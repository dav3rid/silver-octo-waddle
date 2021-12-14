import './App.css';

import { useEffect, useState } from 'react';
import { db } from './firebase.js';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import SignUp from './components/SignUp';
import Hunt from './components/Hunt';

function App() {
  const [user, setUser] = useState({
    name: 'Philippa B',
    id: 'bHOon9i1QgHTFecdk0Gc',
  });
  console.log(user);

  return (
    <div className="App">
      <p>Logo here...</p>
      {user ? (
        <Hunt user={user} setUser={setUser} />
      ) : (
        <SignUp setUser={setUser} />
      )}
    </div>
  );
}

export default App;
