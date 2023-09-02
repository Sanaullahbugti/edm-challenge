import React, { useState } from 'react';
import styles from './Layout.module.scss';
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faHome, faChartBar, faUsers, faCog, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ( { children } ) => {
    const [isSidebarOpen, setSidebarOpen] = useState( false );
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setSidebarOpen( !isSidebarOpen );
    };
    const handleLogout = () => {
        dispatch( logout() );
        navigate( '/login' );
    };

    return (
        <div className={styles.dashboard}>
            <button className={styles.hamburger} onClick={toggleSidebar}>
                {isSidebarOpen ? '×' : '☰'}
            </button>
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    🚀
                </div>
                <div className={styles.menu}>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faHome} className="icon" />
                        <span className="label">Dashboard</span>
                    </div>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faChartBar} className="icon" />
                        <span className="label">Analytics</span>
                    </div>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faUsers} className="icon" />
                        <span className="label">Users</span>
                    </div>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faTicketAlt} className="icon" />
                        <span className="label">Tickets</span>
                    </div>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faCog} className="icon" />
                        <span className="label">Settings</span>
                    </div>
                </div>
                <button className={styles.logout} onClick={handleLogout}>
                    Logout
                </button>
            </aside>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};
