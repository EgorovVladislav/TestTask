import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../features/authSlice';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
            const data = await response.json();

            if (data.length > 0) {
                const userData = {
                    username: data[0].username,
                    id: data[0].id,
                };
                dispatch(setUser(userData));
                navigate('/home');
            } else {
                alert('Пользователь не найден');
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const handleLogout = () => {
        dispatch(clearUser());
    };

    return (
        <div className={styles.container}>
            {!user ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className={styles.button} type="submit">Sign In</button>
                </form>
            ) : (
                <div>
                    <p className={styles.welcome}>Welcome, {user.username}!</p>
                    <button className={styles.button} onClick={handleLogout}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default Login;
