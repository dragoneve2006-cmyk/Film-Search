// INTERFACCIA AUTENTICAZIONE - UTENTE - ADMIN

//Dati Generici Utente - Admin
export interface User {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    role?: 'user' | 'admin';
}

//Dati per Login
export interface UserCredentials {
    email: string;
    password: string;
}

//Dati per Registrazione
export interface RegisterDate extends UserCredentials {
    username: string;
    confirmPassword: string;
}

//Stato Autenticazione
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (credentials: UserCredentials) => Promise<void>;
    register: (data: RegisterDate) => Promise<void>;
    logout: () => void;
}

