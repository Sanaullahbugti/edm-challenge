import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectIsAuthenticated, selectError } from '../../features/user/userSlice';
import styles from './Login.module.scss';

export const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [passwordError, setPasswordError] = useState( '' );
    const [loaded, setLoaded] = useState( false );
    const isAuthenticated = useSelector( selectIsAuthenticated );
    const error = useSelector( selectError );
    const dispatch = useDispatch();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    useEffect( () => {
        if ( !isAuthenticated ) {
            setLoaded( true );
        }
    }, [isAuthenticated] );
    const handleLogin = () => {
        if ( !passwordRegex.test( password ) ) {
            setPasswordError( 'Password must be at least 8 characters long, with 1 uppercase letter, 1 lowercase letter, and 1 special character.' );
            return;
        }

        dispatch( login( { username, password } ) );
    };


    if ( isAuthenticated ) {
        return null;
    }


    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.sideCard}>
                    <div className={styles.logo}>
                        <span className={loaded ? styles.animateRocket : ''}>🚀</span>
                        <h1 className={loaded ? styles.animateEdm : ''}>EDM Solutions</h1>
                    </div>
                    <p>Welcome to our platform!</p>
                    <p>Login to access your dashboard.</p>
                </div>
                <div className={styles.form}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={( e ) => {
                            setUsername( e.target.value )
                            setPasswordError("")
                        }}
                    />
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={( e ) => {
                            setPassword( e.target.value )
                            setPasswordError("")
                        }}
                    />
                    <button className={styles.button} onClick={handleLogin}>
                        Login
                    </button>
                    {error && <div className={styles.error}>{error}</div>}
                    {passwordError && <div className={styles.error}>{passwordError}</div>}

                </div>
            </div>
        </div>
    );
};
