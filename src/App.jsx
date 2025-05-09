import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Removed Router import
import Dashboard from './pages/Dashboard';
import HackathonExplorer from './pages/HackathonExplorer';
import HackathonDetails from './pages/HackathonDetails';
import ProfileDashboard from './pages/ProfileDashboard';
import AuthPage from './AuthPage';
import CreateProfile from './pages/CreateProfile';
import ProfileEdit from './pages/ProfileEdit';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplifyconfiguration.json';

Amplify.configure(amplifyConfig);

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to dashboard if logged in
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Loading state while checking the authentication status
  }

  return (
    <Routes> {/* Removed Router component */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/profile-edit" element={<ProfileEdit />} />
      <Route path="/hackathon-explorer" element={<HackathonExplorer />} />
      <Route path="/hackathon-details" element={<HackathonDetails />} />
      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <AuthPage />} /> {/* Default route for login */}
    </Routes>
  );
}

export default App;
