import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../features/authSlice';
import { RootState } from '../app/store';
import styles from '../styles/Login.module.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            dispatch(setUser(parsedUser));
        }
    }, [dispatch]);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        toast.dismiss()
        const toastTypes = {
            success: toast.success,
            error: toast.error,
            info: toast.info
        }
        toastTypes[type](message)
    }

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
                localStorage.setItem('user', JSON.stringify(userData));
                showToast('Успешный вход!', 'success')
            } else {
                showToast('Такого пользователя нет!', 'error')
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            showToast('Произошла ошибка при попытке входа', 'error')
        }
    };

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem('user');
        showToast('Вы вышли из системы', 'info')
    };

    return (
        <div className={styles.container}>
            <ToastContainer
                position='top-center' />
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
