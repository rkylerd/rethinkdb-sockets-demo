import React from 'react';
import { Routes, Route, BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { SoundPlayerProvider } from './contexts/soundPlayer'
import GlobalSoundPlayer from './components/GlobalPlayer'
import Search from './pages/Search';
import Playlist from './pages/Playlist';

const AppRouter = () => (
  useRoutes([
    { path: "/search", element: <Search /> },
    { path: "/playlist", element: <Playlist /> },
    { path: "/", element: <Search /> },
    // ...
  ])
);

function App() {

  return (
    <SoundPlayerProvider>
      <GlobalSoundPlayer />
      <Router>
        <AppRouter />
      </Router>
    </SoundPlayerProvider>
  )
}

export default App;
