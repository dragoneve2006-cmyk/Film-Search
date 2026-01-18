//Pagina Login
import {useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as {from?: {pathname: string}})?.from?.pathname || '/movies';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try{
            await login({email, password});
            navigate(from, {replace: true});
        }catch (err){
            setError(err instanceof Error ? err.message : 'Errore durante il login');
        }finally{
            setIsLoading(false);
        }
    };

    return(
        <div className="form-container">
            <h1 className="form-title">🎬 Accedi</h1>
            <p className="form-subtitle">Benvenuto! Accedi al tuo account</p>

            {error && (
                <div className="error-message">
                    ❌ {error}
                </div>
            )};

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email@example.com"
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
                            placeholder="********"
                            disabled={isLoading}
                        />
                </div>

                <button type="submit" className="form-button" disabled={isLoading}>
                    {isLoading ? '⏳ Accesso in corso...' : '🎬 Accedi'}
                </button>
            </form>

            <div className="form-link">
                Non hai un account?{(' ')}
                <Link to="/register">
                Registrati ora
                </Link>
            </div>
        </div>
    );
};