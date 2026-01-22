//Home page

import {Link} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export const Home = () => {
    const {isAuthenticated, user} = useAuth();
    
    return(
        <div className="home-container">
            <div className="hero">
                <h1 className="hero-title">
                    🎬 Film Search{isAuthenticated ? ` - Ciao ${user?.username}` : ''}
                </h1>
                <p className="hero-subtitle">
                    Oltre 50k film a portata di click. Cerca, scopri e organnizza la tua watchlist personale!
                </p>
                <div className="hero-actions">
                    {isAuthenticated ? (
                        <>
                            <Link to="/movies" className="btn btn-primary">
                            Esplora Film
                            </Link>
                            <Link to="/watchlist" className="btn btn-secondary">
                            🎬 La Mia Lista
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="btn btn-primary">
                            Registrati Gratis
                            </Link>
                            <Link to="/login" className="btn btn-secondary">
                            Accedi
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="features">
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Cerca Film</h3>
                    <p>Cerca tra più di 50k film usando l'API di TMDB</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⭐</div>
                    <h3>Film Popolari</h3>
                    <p>Scopri i film più popolari del momento</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🎬</div>
                    <h3>Lista Personalizzata</h3>
                    <p>Organizza i film da vedere e quelli già visti con la tua watchlist personale</p>
                </div>
            </div>
        </div>
    );
};