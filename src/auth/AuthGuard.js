import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';

const AuthGuard = ({ children }) => {
    const { user } = useAuthContext();
    const location = useLocation();

    return user ? children : <Navigate to="/sign-in" replace state={{ from: location }} />;
};

export default AuthGuard;
