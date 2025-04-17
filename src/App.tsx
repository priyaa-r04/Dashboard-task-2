import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
import { UserProvider } from "./Components/ContextAPI/UserContext";
import Tables from './Components/Tables/Tables';
import PrivateRoute from './Components/PrivateRoute';
import { TaskProvider } from "./Components/ContextAPI/TaskContext";


const App = () => {
  return (
    <>
    <TaskProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/tables" element={<PrivateRoute><Tables /></PrivateRoute>} />
            </Routes>
        </Router>
      </UserProvider>
      </TaskProvider>
    </>
  );
};

export default App;
