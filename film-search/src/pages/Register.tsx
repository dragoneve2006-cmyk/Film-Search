//Pagina per registrarsi

import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../hooks/useAuth';

export const Register = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try{
            await register({username, email, password, confirmPassword});
            navigate('/movies', {replace: true});
        }catch (err){
            setError(err instanceof Error ? err.message : 'Errore durante la registrazione');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="form-container">
            <h1 className="form-title">🎬 Registrati</h1>
            <p className="form-subtitle">Crea il tuo account</p>

            {error && (
                <div className="error-message">
                    ❌ {error}
                </div>
            )};

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Il tuo username"
                        disabled={isLoading}
                        minLength={3}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="example@gmail.com"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="*******"
                        disabled={isLoading}
                        minLength={6}
                    />
                    <small>Minimo 6 caratteri</small>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Conferma Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="form-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="*******"
                        disabled={isLoading}
                        minLength={6}
                    />
                </div>

                <button type="submit" className="form-button" disabled={isLoading}>
                    {isLoading ? '⏳ Registrazione in corso...' : '✅ Registrati'}
                </button>
            </form>

            <div className="form-link">
                Hai già un account?{' '}
                <Link to="/login">
                Accedi
                </Link>
            </div>
        </div>
    );
};