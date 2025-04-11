import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
import { UserProvider } from "./ContextAPI/UserContext";
import Tables from './Components/Tables';
import ProfilePage from './Components/ProfilePage';
import ToolbarActionsSearch from './Components/ToolbarActionsSearch';
import { useState } from 'react';

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tables" element={<Tables />} />
          </Routes>

          <ToolbarActionsSearch onNavigate={setActivePage} />

          {activePage === "profile" ? (
            <ProfilePage /> 
          ) : (
            <Dashboard /> 
          )}
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
