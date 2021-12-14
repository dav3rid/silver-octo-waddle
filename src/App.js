import './App.css';
import { useState } from 'react';
import SignUp from './components/SignUp';
import Hunt from './components/Hunt';

import logo from './images/nc-logo.jpeg';

// {
//   name: 'Philippa B',
//   id: 'bHOon9i1QgHTFecdk0Gc',
//   progress: 0,
// }

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <img id="logo" src={logo} alt="logo" />
      {user ? (
        <Hunt user={user} setUser={setUser} />
      ) : (
        <SignUp setUser={setUser} />
      )}
    </div>
  );
}

export default App;
