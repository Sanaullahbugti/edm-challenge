import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import styles from './Home.module.scss';
import Table from '../../common/table/Table';
import CustomCard from '../../common/card/CustomCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchPlayers, searchPlayers } from '../../services/home.service';
export const Home: React.FC = () => {
    const user = useSelector( selectUser );
    const [players, setPlayers] = useState( [] );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [searchTerm, setSearchTerm] = useState( '' );
    const [meta, setMeta] = useState( {
        total_pages: 0,
        current_page: 1,
        next_page: 2,
        per_page: 10,
        total_count: 0
    } );

    useEffect( () => {
        const fetchData = async () => {
            try {
                const data = await fetchPlayers( currentPage );
                setPlayers( data.data );
                setMeta( data.meta );
            } catch ( err ) {
                console.error( "Error fetching players:", err );
            }
        };

        fetchData();
    }, [currentPage] );
    useEffect( () => {
        const debounceTimer = setTimeout( async () => {
            if ( searchTerm ) {
                const data = await searchPlayers( currentPage,searchTerm );
                setPlayers( data.data );
                setMeta( data.meta );
            } else {
                // Reset to default if search is cleared
                const data = await fetchPlayers( currentPage );
                setPlayers( data.data );
                setMeta( data.meta );
            }
        }, 500 );  // 500ms delay

        return () => {
            clearTimeout( debounceTimer );
        };
    }, [searchTerm,currentPage] );
    if ( !user ) {
        return null;
    }

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <CustomCard>
                <div className={styles.searchContainer}>
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={( e ) => setSearchTerm( e.target.value )}
                    />
                </div>

                <Table players={players} currentPage={currentPage} meta={meta} onPaginationChange={setCurrentPage} />
            </CustomCard>
        </div>
    );
};
