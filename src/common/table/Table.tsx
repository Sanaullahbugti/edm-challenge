import React, { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Pagination from '../pagination/Pagination';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    team: {
        abbreviation: string;
        city: string;
        full_name: string;
    };
}
interface TableProps {
    players: Player[];
    currentPage: number;
    meta: any;
    onPaginationChange: ( page: number ) => void;
}

const Table: React.FC<TableProps> = ( { players, currentPage, meta, onPaginationChange } ) => {

    const user = useSelector( selectUser );
    const [sortField, setSortField] = useState<keyof Player | null>( null );
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>( 'asc' );

    const handleSort = ( field: keyof Player ) => {
        setSortField( field );
        setSortDirection( prev => ( prev === 'asc' ? 'desc' : 'asc' ) );
    };

    const sortedPlayers = [...players].sort( ( a, b ) => {
        const aValue = a[sortField!];
        const bValue = b[sortField!];

        if ( typeof aValue === 'string' && typeof bValue === 'string' ) {
            return sortDirection === 'asc' ? aValue.localeCompare( bValue ) : bValue.localeCompare( aValue );
        }

        if ( typeof aValue === 'number' && typeof bValue === 'number' ) {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
    } );

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort( 'id' )}>
                            ID{' '}
                            {sortField === 'id' && (
                                <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                            )}
                        </th>
                        <th onClick={() => handleSort( 'first_name' )}>
                            First Name{' '}
                            {sortField === 'first_name' && (
                                <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                            )}
                        </th>
                        <th onClick={() => handleSort( 'last_name' )}>
                            Last Name{' '}
                            {sortField === 'last_name' && (
                                <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
                            )}
                        </th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPlayers.map( ( player ) => (
                        <tr key={player.id}>
                            <td>{player.id}</td>
                            <td>{player.first_name}</td>
                            <td>{player.last_name}</td>
                            <td>{player.team.full_name}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className={`${styles.actionIcon} fa-eye`} 
                                    onClick={() => console.log( `Viewing ${player.id}` )}
                                />
                                {user?.role == "editor" && <>  <FontAwesomeIcon
                                    icon={faEdit}
                                    className={`${styles.actionIcon} fa-edit`} 
                                    onClick={() => console.log( `Editing ${player.id}` )}
                                />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className={`${styles.actionIcon} fa-trash`} 
                                        onClick={() => console.log( `Deleting ${player.id}` )}
                                    />
                                </>
                                }
                            </td>
                        </tr>
                    ) )}
                </tbody>
            </table>
            <div>
                <Pagination
                    totalPages={meta.total_pages}
                    currentPage={currentPage}
                    onPageChange={( page: any ) => onPaginationChange( page )}
                />
            </div>
        </div>
    );
};

export default Table;
