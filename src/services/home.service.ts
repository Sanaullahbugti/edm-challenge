// service.ts
// this baseURL should be in env but due to time just putting here 
const baseURL = "https://www.balldontlie.io/api/v1/players"
export const fetchPlayers = async ( page: number ) => {
    const url = `${baseURL}?page=${page}&per_page=5`;
    const response = await fetch( url );
    if ( !response.ok ) {
        throw new Error( 'Network response was not ok' );
    }
    return response.json();
};

export const searchPlayers = async ( page: number, searchTerm: string = "" ) => {
    let url = `${baseURL}?page=${page}&per_page=5`;
    if ( searchTerm ) {
        url += `&search=${encodeURIComponent( searchTerm )}`;
    }
    const response = await fetch( url );
    if ( !response.ok ) {
        throw new Error( 'Network response was not ok' );
    }
    return response.json();
};

