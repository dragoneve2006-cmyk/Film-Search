// Gestione del routing della SPA

import {BrowserRouter, Routes, Route, Link, NavLink, Navigate} from 'react-router-dom';
import {Home} from '../pages/Home';
import {Movies} from '../pages/Movies';
import {MovieDetail} from '../pages/MovieDetail';
import {NotFound} from '../pages/NotFound';
import {Register} from '../pages/Register';
import {AdminPanel} from '../pages/AdminPanel';
import {ProtectedRoute} from '../components/ProtectedRoute';
import {useAuth} from '../hooks/useAuth';
import {Login} from '../pages/Login';
import {Favorites} from '../pages/Favorites';
import {ToWatch} from '../pages/ToWatch';
import {Watched} from '../pages/Watched';
import {Watchlist} from '../pages/Watchlist';
import { AccountSettings } from '../pages/AccountSettings';
import ClickSpark from '../components/ClickSpark';

export const AppRouter = () => {
    const {isAuthenticated, user, isAdmin, logout} = useAuth();

    /* Spark effect ad ogni click del mouse */
    return(
        <ClickSpark
      sparkColor="#3b82f6"
      sparkSize={15}
      sparkRadius={30}
      sparkCount={12}
      duration={600}
      easing="ease-out"
      extraScale={1.2}
    >
    
    {/* Struttura della SPA con navigazione e routing */}
        <BrowserRouter>
            <div className="app">
                <nav className="navbar">
                    <Link to="/" className="navbar-brand">
                        🎬 Film Search
                    </Link>
                    <div className="navbar-links">
                        <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                            Home
                        </NavLink>
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/movies" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                    Film
                                </NavLink>
                                <NavLink to="/watchlist" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                    🎬 La Mia Lista
                                </NavLink>
                                {isAdmin && (
                                    <NavLink to="admin" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                        👑 Admin
                                    </NavLink>
                                )}
                                <NavLink to="/account" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                    ⚙️ Account
                                </NavLink>
                                <div className="user-menu">
                                    <span className="user-info">
                                        {isAdmin ? '👑' : '👤'} {user?.username}
                                    </span>
                                    <button onClick={logout} className="btn btn-secondary btn-logout">
                                        Esci
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                    Accedi
                                </NavLink>
                                <NavLink to="/register" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                    Registrati
                                </NavLink>
                            </>
                        )}
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Navigate to="/movies" replace /> : <Login />}
                        />
                        <Route
                            path="/register"
                            element={isAuthenticated ? <Navigate to="/movies" replace /> : <Register />}
                        />
                        <Route
                            path="/movies"
                            element={
                                <ProtectedRoute>
                                    <Movies />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/movies/:id"
                            element={
                                <ProtectedRoute>
                                    <MovieDetail />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/watchlist"
                            element={
                                <ProtectedRoute>
                                    <Watchlist />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/favorites"
                            element={
                                <ProtectedRoute>
                                    <Favorites />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/to-watch"
                            element={
                                <ProtectedRoute>
                                    <ToWatch />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/watched"
                            element={
                                <ProtectedRoute>
                                    <Watched />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <AccountSettings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminPanel />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <footer className="footer">
                    <p>© 2026 Film Search. Tutti i diritti sono riservati.</p>
                </footer>
            </div>
        </BrowserRouter>
    </ClickSpark>
    );
}