import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from './Landingpage/Landingpage';
import Links from './Links/Links';
import Home from './home/Home';
import Playlist from './playlist/playlist';
import Searchbare from './Searche/Searchbare';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        {isLoggedIn && <Links />}
        <Routes>
          <Route path="/" element={<Landingpage onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/playlist" element={<Playlist />} />
    

        </Routes>
      </Router>
    </div>
  );
}

export default App;
