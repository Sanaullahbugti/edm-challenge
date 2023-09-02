import React from 'react';
import styles from './CustomCard.module.scss';

interface CustomCardProps {
    children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ children }) => {
    return <div className={styles.card}>{children}</div>;
};

export default CustomCard;
