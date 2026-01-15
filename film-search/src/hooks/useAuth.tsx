//Custom Hook per gestione Autenticazione Utente

import {create} from 'zustand';
import type {UserCredentials, RegisterData, User} from '../types/auth';
import{
    registerUser,
    loginUser,
    getCurrentUser,
    setCurrentUser,
    logoutUser as dbLogout,
    updateUserEmail,
    updateUsername,
    updateUserPassword,
    deleteUserAccount
} from '../utils/authdb';
import {useFavorites} from './useFavorites';
import {useWatchlist} from './useWatchlist';

interface AuthState{
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (credentials: UserCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    updateEmail: (newEmail: string) => Promise<void>;
    updateUsername: (newUsername: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    deleteAccount: (password: string) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => {
    const currentUser = getCurrentUser();

    return{
        user: currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',

        login: async (credentials: UserCredentials) => {
            try{
                const user = loginUser(credentials.email, credentials.password);
                setCurrentUser(user);
                set({user, isAuthenticated: true, isAdmin: user.role === 'admin'});

                // Carica preferiti e watchlist al login
                useFavorites.getState().loadFavorites();
                useWatchlist.getState().loadWatchlist();
            }catch (error){
                throw error;
            }
        },

        register: async (data: RegisterData) => {
            try{
                //Valido i dati e registro l'utente
                if(data.password !== data.confirmPassword){
                    throw new Error('Le password non corrispondono');
                }

                if(data.password.length < 6){
                    throw new Error('La password deve essere di almeno 6 caratteri');
                }

                if(!data.email.includes('@')){
                    throw new Error('Email non valida');
                }

                if(data.username.length < 3){
                    throw new Error('Il nome utente deve essere di almeno 3 caratteri');
                }

                const user = registerUser(data.username, data.email, data.password);
                setCurrentUser(user);
                set({user, isAuthenticated: true, isAdmin: false});

                // Inizializzo preferiti e watchlist vuoti
                useFavorites.getState().initializeFavorites();
                useWatchlist.getState().initializeWatchlist();
            }catch (error){
                throw error;
            }
        },

        logout: () => {
            dbLogout();
            set({user:null, isAuthenticated:false, isAdmin:false});

            // Pulisco preferiti e watchlist al logout
            useFavorites.getState().clearFavorites();
            useWatchlist.getState().clearWatchlist();
        },

        updateEmail: async (newEmail: string) => {
            const currentUser = getCurrentUser();
            if(!currentUser){
                throw new Error('Utente non autenticato');
            }

            try{
                const updatedUser = updateUserEmail(currentUser.id, newEmail);
                set({user: updatedUser});
            }catch (error){
                throw error;
            }
        },

        updateUsername: async (newUsername: string) => {
            const currentUser = getCurrentUser();
            if(!currentUser){
                throw new Error('Utente non autenticato');
            }
            
            try{
                const updatedUser = updateUsername(currentUser.id, newUsername);
                set({user: updatedUser});
            }catch (error){
                throw error;
            }
        },

        changePassword: async (currentPassword: string, newPassword: string) => {
            const currentUser = getCurrentUser();
            if(!currentUser){
                throw new Error('Utente non autenticato');
            }

            try{
                updateUserPassword(currentUser.id, currentPassword, newPassword);
            }catch (error){
                throw error;
            }
        },

        deleteAccount: async (password: string) => {
            const currentUser = getCurrentUser();
            if(!currentUser){
                throw new Error('Utente non autenticato');
            }

            try{
                deleteUserAccount(currentUser.id, password);
                useFavorites.getState().clearFavorites();
                useWatchlist.getState().clearWatchlist();
                set({user:null, isAuthenticated:false, isAdmin:false});
            }catch (error){
                throw error;
            }
        },
    };
});
        