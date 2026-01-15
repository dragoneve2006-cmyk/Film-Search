//CREAZIONE DATABASE LOCALE PER AUTHENTICAZIONE E GESTIONE UTENTI
import type { User } from '../types/auth';  

//Database locale simulato
const USERS_KEY = 'film_search_users';
const CURRENT_USER_KEY = 'film_search_current_user';

//Credenziali Admin Predefinite
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

//Interfaccia utente memorizzata nel database locale
//(inclusa la password per semplicità)
interface StoredUser {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    role: 'user' | 'admin';
    password: string; 
}

//Utente senza password per l'autenticazione
export interface UserWithoutPassword {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    role: 'user' | 'admin';
}

//Creazione Adimin Predefinito se non esiste
const initializeAdmin = () => {
    const users = getAllUsers();
    const adminExists = users.some(u => u.email === ADMIN_EMAIL);

    if(!adminExists){
        const adminUser: StoredUser ={
            id: crypto.randomUUID(),
            email: ADMIN_EMAIL,
            username: 'Admin',
            password: ADMIN_PASSWORD,
            role: 'admin',
            createdAt: new Date().toISOString(),
        }
        users.push(adminUser);
        saveUsers(users);
    }
};

//Ottenere tutti gli utenti dal database locale
export const getAllUsers = (): StoredUser[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

//Salvare utenti nel database locale
export const saveUsers = (user: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(user));
}

//Aggiungere nuovo utente al database locale
export const registerUser = (email: string, password: string, username: string): User => {
    initializeAdmin(); //Ci assicuriamo che l'admin esista
    const users = getAllUsers();

    //Controllo se l'email è gia registrata
    if(users.some(u => u.email === email)){
        throw new Error('Email già registrata');
    }

    //Controllo se l'username è gia in uso
    if(users.some(u => u.username === username)){
        throw new Error('Username già in uso');
    }

    //Creo nuovo utente
    const newUser: StoredUser = {
        id: crypto.randomUUID(),
        email,
        username,
        password,
        role: 'user',
        createdAt: new Date().toISOString(),
    }

    //Salvo nuovo utente
    users.push(newUser);
    saveUsers(users);

    //Utente senza password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

//Login Utente
export const loginUser = (email: string, password: string): User => {
    initializeAdmin(); //Ci assicuriamo che l'admin esista
    const users = getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if(!user){
        throw new Error('Credenziali Errate');
    }

    //Utente senza password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

//Otteniamo tutti gli utenti per l'admin - tutti i dati tranne la password
export const getAllUsersForAdmin = (): UserWithoutPassword[] => {
    const users = getAllUsers();
    //Rimuovo le password
    return users.map(({ password, ...user} ) => user);
};

//Salvo l'utente attualmente loggato
export const setCurrentUser = (user: User | null) => {
    if(user){
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }else{ 
        localStorage.removeItem(CURRENT_USER_KEY);
    }
};

//Ottengo l'utente attualmente loggato
export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};

//Logout utente
export const logoutUser = () => {
    setCurrentUser(null);
};

//Cambio Email Utente
export const updateUserEmail = (userId: string, newEmail: string) => {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    //controllo esistenza utente
    if(userIndex === -1){
        throw new Error('Utente non trovato');
    }

    //Controllo se la nuova email è gia in uso
    const emailExists = users.some(u => u.email === newEmail && u.id !== userId);
    if(emailExists){
        throw new Error('Email già in uso');
    }

    //Controllo validità email
    if(!newEmail.includes('@')){
        throw new Error('Email non valida');
    }

    //Aggiorno email
    users[userIndex].email = newEmail;
    saveUsers(users);

    //Aggiorno utente attuale
    const currentUser = getCurrentUser();
    if(currentUser && currentUser.id === userId){
        const updateUser = users[userIndex]
        setCurrentUser(updateUser);
        return updateUser;
    }

    return users[userIndex];
};

//Cambio Username Utente
export const updateUsername = (userId: string, newUsername: string): User => {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1){
        throw new Error('Utente non trovato');
    }

    if(newUsername.length < 3){
        throw new Error('Il nome utente deve contenere almeno 3 caratteri')
    }

    users[userIndex].username = newUsername;
    saveUsers(users);

    //Aggiorno dati utente
    const currentUser = getCurrentUser();
    if(currentUser && currentUser.id === userId){
        const updateUser = users[userIndex]
        setCurrentUser(updateUser);
        return updateUser;
    }

    return users[userIndex];
}

//Cambio Password Utente
export const updateUserPassword = (userId: string, currentPassword: string, newPassword: string): User => {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1){
        throw new Error('Utente non trovato');
    }

    //Controllo password attuale
    if(users[userIndex].password !== currentPassword){
        throw new Error('Password attuale errata');
    }

    if(newPassword.length < 6){
        throw new Error('La nuova password deve conteneere almeno 6 caratteri');
    }

    //Aggiorno password
    users[userIndex].password = newPassword;
    saveUsers(users);

    return users[userIndex];
}

//Eliminazione Account Utente
export const deleteUserAccount = (userId: string, password: string): void => {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1){
        throw new Error('Utente non trovato');
    }

    //Controllo password
    if(users[userIndex].password !== password){
        throw new Error('Password errata');
    }

    //Rimozione Utente
    users.splice(userIndex, 1);
    saveUsers(users);

    //Rimozione account attuale
    const currentUser = getCurrentUser();
    if(currentUser && currentUser.id === userId){
        setCurrentUser(null);
    }

    //Rimozione Preferiti e Liste dell'Utente
    const favoritesKey = `favorites_${userId}`;
    localStorage.removeItem(favoritesKey);
}



    
    
