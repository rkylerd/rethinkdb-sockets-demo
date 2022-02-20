import React from 'react';
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom'
import { SoundPlayerProvider } from './contexts/soundPlayer'
import GlobalSoundPlayer from './components/GlobalPlayer'
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import { PlaylistProvider } from './contexts/playlist';

const AppRouter = () => (
  useRoutes([
    { path: "/search", element: <Search /> },
    { path: "/playlist", element: <Playlist /> },
    { path: "/", element: <Search /> },
  ])
);

function App() {

  return (
    <SoundPlayerProvider>
      <GlobalSoundPlayer />
      <PlaylistProvider>
        <Router>
          <section>
            <div style={{ padding: '10px' }}>
              <Link style={{ padding: '5px' }} to="/playlist">Playlist</Link>
              <Link style={{ padding: '5px' }} to="/search">Search</Link>
            </div>
          </section>
          <AppRouter />
        </Router>
      </PlaylistProvider>
    </SoundPlayerProvider>
  );
}

export default App;
