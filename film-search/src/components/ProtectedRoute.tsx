//Coponent per la gestione della protezione delle routes solo degli utenti autenticati
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import type React from 'react';

interface ProtectedRouteProps{
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    if(!isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return <>{children}</>;
};