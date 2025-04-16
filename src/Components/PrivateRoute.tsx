import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './ContextAPI/UserContext';
import { ReactNode } from 'react'; 

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default PrivateRoute;
