import { Routes, Route, HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../src/Pages/Home/Home';
import About from '../src/Pages/About/About';
import Dashboard from '../src/Pages/Dashboard/Dashboard';
import { Auth0Provider } from '@auth0/auth0-react';


const App: React.FC = () => {
    return (
      <Auth0Provider
        domain={"dev-wg30jekgae6ys6sy.us.auth0.com"}
        clientId={"Em9G9IKfIyprnmNqh6mTmeTfcvaOJ9mZ"}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About/About" element={<About />} />
            <Route path="/Dashboard/Dashboard" element={<Dashboard />} />
          </Routes>
    </HashRouter>
  </Auth0Provider>
  )
};

export default App;
