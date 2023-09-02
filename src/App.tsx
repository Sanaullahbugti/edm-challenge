import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './features/user/userSlice';
import { LoginComponent } from './pages/login/Login';
import { Home } from './pages/home/Home';
import { Layout } from './common/layout/Layout';  // Import Layout here

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/home" element={<Layout><Home /></Layout>} /> 
        <Route path="*" element={<Outlet />} />
      </Routes>
    </div>
  );
}

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
