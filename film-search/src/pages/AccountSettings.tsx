//Pagina impostazioni dell'utente
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export const AccountSettings = () => {
    const {user, updateEmail, updateUsername, changePassword, deleteAccount} = useAuth();
    const navigate = useNavigate();

    //Email
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [emailError, setEmailError] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

    //Username
    const [newUsername, setNewUsername] = useState(user?.username || '');
    const [usernameError, setUsernameError] = useState('');
    const [usernameSuccess, setUsernameSuccess] = useState('');
    const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

    //Password
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    //Eliminazione account
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleEmailUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setEmailSuccess('');
        setIsUpdatingEmail(true);

        try{
            await updateEmail(newEmail);
            setEmailSuccess('Email aggiornata con successo');
        }catch(err){
            setEmailError(err instanceof Error ? err.message : 'Errore durante l\'aggiornamento dell\'email');
        }finally {
            setIsUpdatingEmail(false);
        };
    };

    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setUsernameSuccess('');
        setIsUpdatingUsername(true);

        try{
            await updateUsername(newUsername);
            setUsernameSuccess('Username aggiornato con successo');
        }catch(err){
            setUsernameError(err instanceof Error ? err.message : 'Errore durante l\'aggiornamento dell\'username');
        }finally{
            setIsUpdatingUsername(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        setIsUpdatingPassword(true);

        try{
            if(newPassword !== confirmNewPassword){
                throw new Error('Le nuove password non corrispondono');
        }

        await changePassword(currentPassword, newPassword);
            setPasswordSuccess('Password cambiata con successo');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }catch(err){
            setPasswordError(err instanceof Error ? err.message : 'Errore durante il cambio della password');
        }finally{
            setIsUpdatingPassword(false);
        }
    };

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setDeleteError('');
        setIsDeletingAccount(true);

        try{
            await deleteAccount(deletePassword);
            navigate('/login', {replace: true});
        }catch(err){
            setDeleteError(err instanceof Error ? err.message : 'Errore durante l\'eliminazione dell\'account');
            setIsDeletingAccount(false);
        }
    };


    return(
            <div className="container">
                <div className="page-header">
                    <h1>⚙️ Impostazioni Account</h1>
                    <p>Gestisci il tuo account</p>
                </div>

                <div className="settings-container">
                    <div className="settings-section">
                        <div className="settings-section-header">
                            <h2>👤 Informazioni Account</h2>
                        </div>
                        <div className="settings-info">
                            <p><strong>ID Utente:</strong> {user?.id}</p>
                            <p><strong>Ruolo: </strong> {user?.role === 'admin' ? 'Amministratore' : 'Utente'}</p>
                            <p><strong>Creato il:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('it-IT') : 'N/A'}</p>
                        </div>
                    </div>
                
                <div className="settings-section">
                    <div className="settings-section-header">
                        <h2>📧 Modifica Email</h2>
                    </div>
                    {emailSuccess && <p className="success-message">✅ {emailSuccess}</p>}
                    {emailError && <p className="error-message">❌ {emailError}</p>}
                    <form onSubmit={handleEmailUpdate} className="settings-form">
                        <div className="form-group">
                            <label htmlFor="email">Nuova Email</label>
                            <input
                                id="email"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                required
                                placeholder="example@gmail.com"
                                disabled={isUpdatingEmail}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isUpdatingEmail || newEmail === user?.email}>
                            {isUpdatingEmail ? 'Aggiornamento...' : 'Aggiorna Email'}
                        </button>
                    </form>
                </div>

                <div className="settings-section">
                    <div className="settings-section-header">
                        <h2>✏️ Modifica Username</h2>
                    </div>
                    {usernameSuccess && <p className="success-message">✅ {usernameSuccess}</p>}
                    {usernameError && <p className="error-message">❌ {usernameError}</p>}
                    <form onSubmit={handleUpdateUsername} className="settings-form">
                        <div className="form-group">
                            <label htmlFor="username">Nuovo Username</label>
                            <input
                                id="username"
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                                placeholder="Il tuo nuovo username"
                                disabled={isUpdatingUsername}
                                minLength={3}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isUpdatingUsername || newUsername === user?.username}>
                            {isUpdatingUsername ? 'Aggiornamento...' : 'Aggiorna Username'}
                        </button>
                    </form>
                </div>

                <div className="settings-section">
                    <div className="settings-section-header">
                        <h2>🔒 Cambia Password</h2>
                    </div>
                    {passwordSuccess && <p className="success-message">✅ {passwordSuccess}</p>}
                    {passwordError && <p className="error-message">❌ {passwordError}</p>}
                    <form onSubmit={handleChangePassword} className="settings-form">
                        <div className="form-group">
                            <label htmlFor="currentPassword">Password Attuale</label>
                            <input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                placeholder="**********"
                                disabled={isUpdatingPassword}
                                minLength={6}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nuova Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                placeholder="**********"
                                disabled={isUpdatingPassword}
                                minLength={6}
                            />
                            <small>Minimo 6 caratteri</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmNewPassword">Conferma Nuova Password</label>
                            <input
                                id="confirmNewPassword"
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                                placeholder="**********"
                                disabled={isUpdatingPassword}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isUpdatingPassword}>
                            {isUpdatingPassword ? 'Aggiornamento...' : 'Cambia Password'}
                        </button>
                    </form>
                </div>

                <div className="settings-section danger-zone">
                    <div className="settings-section-header">
                        <h2>🗑️ Elimina Account</h2>
                    </div>
                    <div className="danger-zone">
                        <p className="warning-text">
                        ⚠️ <strong>Attenzione:</strong> Questa azione è irreversibile. Eliminando il tuo account,
                        perderai tutti i tuoi dati, inclusi i tuoi film preferiti salvati.
                        </p>

                        {!showDeleteConfirm ? (
                            <button
                                className="btn btn-danger"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Elimina Account
                            </button>
                        ) : (
                            <>
                                {deleteError && <div className="error-message">❌ {deleteError}</div>}
                                <form onSubmit={handleDeleteAccount} className="settings-form">
                                    <div className="form-group">
                                        <label htmlFor="deletePassword">Conferma con la tua password</label>
                                        <input
                                            id="deletePassword"
                                            type="password"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                            required
                                            placeholder="**********"
                                            disabled={isDeletingAccount}
                                        />
                                    </div>
                                    <div className="button-group">
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            disabled={isDeletingAccount}
                                        >
                                            {isDeletingAccount ? 'Eliminazione...' : 'Conferma Eliminazione'} 
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setShowDeleteConfirm(false);
                                                setDeletePassword('');
                                                setDeleteError('');
                                            }}
                                            disabled={isDeletingAccount}
                                        >
                                            Annulla
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

