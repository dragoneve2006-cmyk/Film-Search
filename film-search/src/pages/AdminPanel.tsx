//Pagina privata per l'amministratore

import {useState, useEffect} from "react";
import {getAllUsers, type UserWithoutPassword} from '../utils/authdb';

export const AdminPanel = () => {
    const [users, setUsers] = useState<UserWithoutPassword[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        const allUsers = getAllUsers();
        const usersWithoutPasswords = allUsers.map(({password, ...user}) => user);
        setUsers(usersWithoutPasswords);
    };

    return(
        <div className="container">
            <div className="admin-panel">
                <h1>👑 Pannello Admin</h1>
                <p className="admin-subtitle">Gestione utenti della piattaforma</p>

                <div className="user-section">
                    <h2>Utenti Registrati ({users.length})</h2>
                    <div className="users-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Ruolo</th>
                                    <th>Data di Registrazione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td><code>{user.id.substring(0, 8)}...</code></td>
                                        <td>
                                            <strong>{user.username}</strong>
                                            {user.role === 'admin' && <span className="badge-admin">👑 Admin</span>}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString('it-IT')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="stats-section">
                        <h2>Statistiche</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">👥</div>
                                <div className="stat-value">{users.length}</div>
                                <div className="stat-label">Utenti Totali</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👤</div>
                                <div className="stat-value">{users.filter(u => u.role === 'user').length}</div>
                                <div className="stat-label">Utenti Standard</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👑</div>
                                <div className="stat-value">{users.filter(u => u.role === 'admin').length}</div>
                                <div className="stat-label">Amministratori</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
