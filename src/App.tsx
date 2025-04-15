import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
import { UserProvider } from "./ContextAPI/UserContext";
import Tables from './Components/Tables/Tables';
// import ProfilePage from './Components/ProfilePage';
import { useEffect, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    setActivePage("dashboard"); 
  }, []);
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/tables" element={<PrivateRoute><Tables /></PrivateRoute>} />
            {/* <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> */}
          </Routes>

          {/* {activePage === "profile" && <ProfilePage />} */}
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
