import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
// import SignUp from './Pages/SignUp';
import { UserProvider } from "./Pages/UserContext";



const App = () => {
  return (
    <>
    {/* <SignUp/> */}
    <UserProvider>
  <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </UserProvider>
  </>
  );
};

export default App;
