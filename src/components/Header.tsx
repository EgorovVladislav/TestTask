
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'

const Header: React.FC = () => {
    return (
        <nav className={styles.containerNav}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </nav>
    );
};

export default Header;
