import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
import { UserProvider } from "./ContextAPI/UserContext";



const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
